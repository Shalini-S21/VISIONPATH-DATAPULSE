import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BookOpen, Star, Clock, Filter, CheckCircle2, Play } from 'lucide-react';
import SearchBar from '../../components/common/SearchBar';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import { MOCK_COURSES } from '../../services/mockDataService';
import { addEnrolledCourse } from '../../redux/slices/studentSlice';
import toast from 'react-hot-toast';

export const Courses = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeCourseModal, setActiveCourseModal] = useState(null);

  const categories = ['All', 'Frontend Engineering', 'Artificial Intelligence', 'Backend Engineering', 'Cloud & DevOps', 'Design'];

  const filteredCourses = MOCK_COURSES.filter((crs) => {
    const matchesSearch = crs.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          crs.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = selectedCategory === 'All' || crs.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleEnroll = (course) => {
    dispatch(addEnrolledCourse({
      id: course.id,
      title: course.title,
      instructor: course.instructor,
      progress: 0,
      totalDuration: course.duration,
      completedLessons: 0,
      totalLessons: course.lessonsCount,
      thumbnail: course.thumbnail,
      category: course.category,
      level: course.level,
      rating: course.rating
    }));
    toast.success(`Enrolled in '${course.title}' successfully!`);
    setActiveCourseModal(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Courses Catalog</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Explore industry-leading courses taught by senior architects
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <SearchBar value={searchTerm} onChange={setSearchTerm} placeholder="Search courses or tags (e.g. React 19, LangChain)..." />
        </div>

        <div className="flex flex-wrap items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 overflow-hidden shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="relative h-44">
              <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
              <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 text-white text-[10px] font-bold backdrop-blur-sm">
                {course.level}
              </span>
            </div>

            <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  <span>{course.category}</span>
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star className="w-3 h-3 fill-amber-400" /> {course.rating} ({course.reviewsCount})
                  </span>
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">{course.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2">{course.description}</p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 dark:border-slate-800 pt-3">
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                  <span className="font-extrabold text-emerald-600 dark:text-emerald-400 text-sm">{course.price}</span>
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => setActiveCourseModal(course)}
                >
                  View Details & Enroll
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Detail Modal */}
      {activeCourseModal && (
        <Modal
          isOpen={!!activeCourseModal}
          onClose={() => setActiveCourseModal(null)}
          title={activeCourseModal.title}
        >
          <div className="space-y-4">
            <img src={activeCourseModal.thumbnail} alt="Thumbnail" className="w-full h-44 rounded-2xl object-cover" />
            <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{activeCourseModal.description}</p>
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-700 dark:text-gray-200">
              <span>Instructor: {activeCourseModal.instructor}</span>
              <span>Level: {activeCourseModal.level}</span>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="ghost" onClick={() => setActiveCourseModal(null)}>Close</Button>
              <Button variant="primary" onClick={() => handleEnroll(activeCourseModal)}>Confirm Enrollment</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Courses;
