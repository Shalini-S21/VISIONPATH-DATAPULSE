import React from 'react';
import { useSelector } from 'react-redux';
import DataTable from '../../components/tables/DataTable';
import Badge from '../../components/ui/Badge';
import { Award, Clock, CheckCircle2 } from 'lucide-react';

export const AssessmentHistory = () => {
  const { assessments } = useSelector((state) => state.student);

  const columns = [
    {
      header: 'Assessment Name',
      accessor: 'title',
      render: (row) => (
        <div>
          <p className="font-bold text-gray-900 dark:text-white">{row.title}</p>
          <p className="text-[10px] text-gray-400">ID: {row.id}</p>
        </div>
      )
    },
    { header: 'Date Taken', accessor: 'date' },
    {
      header: 'Score Result',
      accessor: 'score',
      render: (row) => (
        <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">
          {row.score} / {row.maxScore} ({row.score}%)
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      isStatus: true
    },
    {
      header: 'Validated Key Skills',
      accessor: 'topSkills',
      render: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.topSkills.map((s, i) => (
            <span key={i} className="px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-[10px] font-semibold text-gray-700 dark:text-gray-300">
              {s}
            </span>
          ))}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Assessment History</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
          Review historical competency test results and score analytics
        </p>
      </div>

      <DataTable
        title="Historical Competency Test Logs"
        columns={columns}
        data={assessments}
        pageSize={5}
        searchPlaceholder="Filter assessment records..."
      />
    </div>
  );
};

export default AssessmentHistory;
