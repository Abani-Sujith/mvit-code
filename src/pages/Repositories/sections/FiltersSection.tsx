import React, { Dispatch, SetStateAction } from 'react';
import { BarChart3, Search, Target } from 'lucide-react';
import Card, { CardContent } from '../../../components/ui/Card';
import { Hierarchy } from '../../../types';
import { RepositorySortBy } from '../types';

interface FiltersSectionProps {
    searchTerm: string;
    setSearchTerm: Dispatch<SetStateAction<string>>;
    selectedDept: string;
    setSelectedDept: Dispatch<SetStateAction<string>>;
    sortBy: RepositorySortBy;
    setSortBy: Dispatch<SetStateAction<RepositorySortBy>>;
    departments: string[];
    hierarchy: Hierarchy;
}

const FiltersSection: React.FC<FiltersSectionProps> = ({
    searchTerm,
    setSearchTerm,
    selectedDept,
    setSelectedDept,
    sortBy,
    setSortBy,
    departments,
    hierarchy,
}) => (
    <Card hover className="bg-gradient-to-br from-surface to-surface/90 border-t-green-500/30">
        <CardContent className="py-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="group">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-textMuted mb-2 flex items-center transition-colors group-focus-within:text-green-400">
                        <Search className="h-3.5 w-3.5 mr-2" />Search
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-textMuted" />
                        <input
                            type="text"
                            placeholder="Search by team, department, leader..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/30 text-ink-black placeholder-textMuted/50 transition-all font-medium"
                        />
                    </div>
                </div>
                <div className="group">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-textMuted mb-2 flex items-center transition-colors group-focus-within:text-green-400">
                        <Target className="h-3.5 w-3.5 mr-2" />Department
                    </label>
                    <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/30 text-ink-black transition-all cursor-pointer">
                        <option value="" className="bg-surface text-ink-black">All Departments</option>
                        {departments.map(id => (
                            <option key={id} value={id} className="bg-surface text-ink-black">{hierarchy?.[id]?.name || id}</option>
                        ))}
                    </select>
                </div>
                <div className="group">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-textMuted mb-2 flex items-center transition-colors group-focus-within:text-green-400">
                        <BarChart3 className="h-3.5 w-3.5 mr-2" />Sort By
                    </label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="w-full px-4 py-3 bg-white/5 border border-border rounded-xl focus:ring-2 focus:ring-green-500/50 focus:border-green-500/30 text-ink-black transition-all cursor-pointer">
                        <option value="total" className="bg-surface text-ink-black">Total Problems Solved</option>
                        <option value="avg" className="bg-surface text-ink-black">Avg Per Member</option>
                        <option value="members" className="bg-surface text-ink-black">Most Members</option>
                    </select>
                </div>
            </div>
        </CardContent>
    </Card>
);

export default FiltersSection;
