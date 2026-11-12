export interface TeamWorkspace {
    id: string;
    name: string;
    department: string;
    deptId: string;
    section: string;
    sectionId: string;
    teamLeadName: string;
    totalProblemsSolved: number;
    avgPerMember: number;
    memberCount: number;
    topPerformer: string;
    topPerformerScore: number;
    leetcodeTotal: number;
    skillrackTotal: number;
    codechefTotal: number;
    hackerrankTotal: number;
    contributors: any[];
    lastUpdated: string;
}

export interface PlatformBar {
    lc: number;
    sr: number;
    cc: number;
    hr: number;
}

export type RepositorySortBy = 'total' | 'avg' | 'members';
