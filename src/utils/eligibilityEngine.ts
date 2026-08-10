import { GovJob, UserProfile, JobEligibilityResult, MatchStatus } from '../types';

/**
 * Calculates current age in years from YYYY-MM-DD string
 */
export function calculateAge(dobString: string): number {
  if (!dobString) return 21; // fallback
  const dob = new Date(dobString);
  const today = new Date('2026-08-10'); // Or new Date()
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age < 0 ? 0 : age;
}

/**
 * Category Upper Age Limit Relaxation (Years)
 */
export function getCategoryAgeRelaxation(category: UserProfile['category']): number {
  switch (category) {
    case 'SC':
    case 'ST':
      return 5;
    case 'OBC':
    case 'BC':
    case 'EBC':
      return 3;
    case 'EWS':
    case 'General':
    default:
      return 0;
  }
}

const qualificationRanks: Record<string, number> = {
  '10th': 1,
  '12th': 2,
  'Diploma': 3,
  'ITI': 3,
  'Graduate': 4,
  'B.Tech': 5,
  'Post Graduate': 6,
};

/**
 * Evaluates a user profile against a government job vacancy.
 */
export function evaluateJobEligibility(job: GovJob, profile: UserProfile): JobEligibilityResult {
  const age = calculateAge(profile.dob);
  const relaxation = getCategoryAgeRelaxation(profile.category);
  const reasons: string[] = [];
  const warnings: string[] = [];

  let status: MatchStatus = 'Eligible';
  let score = 100;

  // 1. AGE CHECK
  const minAge = job.minAge ?? 18;
  const maxAgeGen = job.maxAgeGen ?? 35;
  const effectiveMaxAge = maxAgeGen + relaxation;

  if (age < minAge) {
    status = 'Not Eligible';
    score -= 50;
    reasons.push(`Underage: Your age (${age} yrs) is below the minimum required age of ${minAge} yrs.`);
  } else if (age > effectiveMaxAge) {
    status = 'Not Eligible';
    score -= 50;
    reasons.push(
      `Overage: Your age (${age} yrs) exceeds the maximum limit of ${effectiveMaxAge} yrs (including +${relaxation} yrs ${profile.category} relaxation).`
    );
  } else {
    reasons.push(`Age ${age} yrs is within the allowable range (${minAge}–${effectiveMaxAge} yrs with ${profile.category} quota).`);
  }

  // 2. QUALIFICATION & BRANCH CHECK
  const jobLevelName = job.reqQualificationLevel || job.qualification;
  const jobRank = qualificationRanks[jobLevelName] || 4;
  const userRank = qualificationRanks[profile.highestQualification] || 4;

  const userBranchUpper = (profile.degreeBranch || '').toUpperCase();
  const reqBranches = job.reqBranches || [];

  // Check branch specifics if specified
  if (reqBranches.length > 0 && !reqBranches.includes('Any')) {
    const hasBranchMatch = reqBranches.some((b) => userBranchUpper.includes(b.toUpperCase()));
    if (!hasBranchMatch) {
      // Specialized engineering/technical degree job
      if (jobLevelName === 'B.Tech' || jobLevelName === 'Diploma') {
        if (profile.highestQualification === 'B.Tech' || profile.highestQualification === 'Diploma') {
          status = 'Not Eligible';
          score -= 40;
          reasons.push(`Branch Mismatch: Job requires ${reqBranches.join('/')} degree/diploma, but your branch is "${profile.degreeBranch}".`);
        } else {
          status = 'Not Eligible';
          score -= 40;
          reasons.push(`Education Mismatch: Job requires technical degree in ${reqBranches.join('/')}.`);
        }
      } else {
        warnings.push(`Specialized discipline required: ${reqBranches.join(', ')}.`);
      }
    } else {
      reasons.push(`Degree branch (${profile.degreeBranch}) matches required stream (${reqBranches.join(', ')}).`);
    }
  }

  // General qualification level check
  if (userRank < jobRank) {
    if (status !== 'Not Eligible') {
      status = 'Not Eligible';
    }
    score -= 40;
    reasons.push(`Educational Qualification: Job requires minimum ${jobLevelName}, but highest qualification recorded is ${profile.highestQualification}.`);
  } else if (userRank >= jobRank && (reqBranches.length === 0 || reqBranches.includes('Any'))) {
    reasons.push(`Qualifications meet minimum criteria (${jobLevelName} or above).`);
  }

  // ITI / Technical check for ISRO/Trade jobs
  if (job.title.toLowerCase().includes('technician') || job.title.toLowerCase().includes('iti')) {
    const hasIti = profile.diplomaIti.toLowerCase().includes('iti') || profile.highestQualification === 'ITI';
    if (!hasIti && userRank >= 4) {
      if (status === 'Eligible') status = 'Possibly Eligible';
      warnings.push('Trade Certificate required: Check if your engineering degree/diploma grants equivalence for ITI Technician posts.');
    } else if (!hasIti) {
      status = 'Not Eligible';
      reasons.push('Requires NTC/NAC ITI Certificate in specified trade.');
    }
  }

  // 3. PHYSICAL CRITERIA (For Police / Defence / Constable / SI)
  if (job.requiresPhysical) {
    if (profile.gender === 'Male' && job.minHeightMaleCm) {
      if (profile.heightCm < job.minHeightMaleCm) {
        status = 'Not Eligible';
        score -= 30;
        reasons.push(`Physical Criteria: Height (${profile.heightCm} cm) is below required ${job.minHeightMaleCm} cm for male candidates.`);
      } else {
        reasons.push(`Height (${profile.heightCm} cm) meets required ${job.minHeightMaleCm} cm standard.`);
      }
    } else if (profile.gender === 'Female' && job.minHeightFemaleCm) {
      if (profile.heightCm < job.minHeightFemaleCm) {
        status = 'Not Eligible';
        score -= 30;
        reasons.push(`Physical Criteria: Height (${profile.heightCm} cm) is below required ${job.minHeightFemaleCm} cm for female candidates.`);
      } else {
        reasons.push(`Height (${profile.heightCm} cm) meets required ${job.minHeightFemaleCm} cm standard.`);
      }
    }

    if (!profile.isPhysicalFit) {
      warnings.push('Physical Fitness Test (Running/High Jump) is mandatory for final selection.');
    }
  }

  // 4. DOMICILE & CATEGORY STATE QUOTA
  if (job.type === 'Bihar') {
    if (profile.state === 'Bihar') {
      reasons.push(`Bihar Domicile: Full state reservation benefit applicable under ${profile.category} category.`);
    } else {
      if (status === 'Eligible') status = 'Possibly Eligible';
      warnings.push(`Other State Candidate: Eligible to apply under Unreserved / General quota in Bihar.`);
    }
  } else {
    reasons.push('All India Recruitment: Open to candidates across all states.');
  }

  // 5. MARKS PERCENTAGE CHECK
  if (job.minTenthPercentage && profile.tenthPercentage < job.minTenthPercentage) {
    status = 'Not Eligible';
    reasons.push(`10th Marks: Your ${profile.tenthPercentage}% is below required ${job.minTenthPercentage}%.`);
  }
  if (job.minTwelfthPercentage && profile.twelfthPercentage < job.minTwelfthPercentage) {
    status = 'Not Eligible';
    reasons.push(`12th Marks: Your ${profile.twelfthPercentage}% is below required ${job.minTwelfthPercentage}%.`);
  }
  if (job.minGraduationPercentage && profile.graduationPercentage < job.minGraduationPercentage) {
    status = 'Not Eligible';
    reasons.push(`Graduation Marks: Your ${profile.graduationPercentage}% is below required ${job.minGraduationPercentage}%.`);
  }

  // Special conditions / Borderline notifications check
  if (job.specialConditions) {
    if (status === 'Eligible') {
      status = 'Possibly Eligible';
    }
    warnings.push(`Notice: ${job.specialConditions}`);
  }

  // Adjust score
  if (status === 'Eligible') score = Math.max(score, 90);
  if (status === 'Possibly Eligible') score = Math.min(Math.max(score, 60), 85);
  if (status === 'Not Eligible') score = Math.min(score, 35);

  return {
    job,
    status,
    score,
    reasons,
    warnings,
  };
}
