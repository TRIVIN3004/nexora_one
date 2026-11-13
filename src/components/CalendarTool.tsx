import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Calendar, Save, Trash } from 'lucide-react';

interface CalendarToolProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalendarTool: React.FC<CalendarToolProps> = ({ isOpen, onClose }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [noteText, setNoteText] = useState('');
  const [notes, setNotes] = useState<Record<string, string>>({});

  // Load notes from localStorage on mount
  useEffect(() => {
    try {
      const savedNotes = localStorage.getItem('nexora_calendar_notes');
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes));
      }
    } catch (e) {
      console.error("Failed to load calendar notes", e);
    }
  }, []);

  // Update note text box whenever selected date changes
  const getDateKey = (date: Date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  useEffect(() => {
    const key = getDateKey(selectedDate);
    setNoteText(notes[key] || '');
  }, [selectedDate, notes]);

  if (!isOpen) return null;

  // Save note helper
  const handleSaveNote = () => {
    const key = getDateKey(selectedDate);
    const updatedNotes = { ...notes };
    
    if (noteText.trim() === '') {
      delete updatedNotes[key];
    } else {
      updatedNotes[key] = noteText;
    }
    
    setNotes(updatedNotes);
    localStorage.setItem('nexora_calendar_notes', JSON.stringify(updatedNotes));
  };

  // Delete note helper
  const handleDeleteNote = () => {
    const key = getDateKey(selectedDate);
    const updatedNotes = { ...notes };
    delete updatedNotes[key];
    setNotes(updatedNotes);
    localStorage.setItem('nexora_calendar_notes', JSON.stringify(updatedNotes));
    setNoteText('');
  };

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const days = [];
  // Prev month padding
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(null);
  }
  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const isSelected = (date: Date) => {
    return date.getDate() === selectedDate.getDate() && 
           date.getMonth() === selectedDate.getMonth() && 
           date.getFullYear() === selectedDate.getFullYear();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main container */}
      <div className="w-full max-w-md bg-white dark:bg-brand-navy/95 border-t sm:border border-brand-cyan/20 rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl z-10 transition-transform duration-300 transform translate-y-0 relative max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden">
        {/* Decorative Pull Pill */}
        <div className="w-12 h-1.5 bg-black/10 dark:bg-white/10 rounded-full mx-auto mb-4 sm:hidden cursor-pointer" onClick={onClose} />

        {/* Header */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Calendar className="w-5.5 h-5.5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-brand-navy dark:text-white leading-tight">Ecosystem Calendar</h3>
              <span className="text-[10px] text-brand-secondary font-semibold">Workspace Schedule Organizer</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-brand-secondary hover:text-brand-navy dark:hover:text-white transition-colors"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Content Panel */}
        <div className="flex-grow overflow-y-auto no-scrollbar my-4 pr-1">
          
          {/* Month Controller header */}
          <div className="flex justify-between items-center bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-3 mb-4 select-none">
            <button 
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-brand-secondary hover:text-brand-navy dark:hover:text-white active:scale-90 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-extrabold text-brand-navy dark:text-white">
              {monthNames[month]} {year}
            </span>
            <button 
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 text-brand-secondary hover:text-brand-navy dark:hover:text-white active:scale-90 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Date Grid */}
          <div className="bg-gray-50/50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-3xl p-4">
            {/* Weekdays Row */}
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <span key={day} className="text-[11px] font-extrabold text-brand-blue dark:text-brand-cyan uppercase tracking-wider">
                  {day}
                </span>
              ))}
            </div>

            {/* Days Grid cells */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {days.map((date, idx) => {
                if (!date) {
                  return <div key={`empty-${idx}`} className="aspect-square" />;
                }

                const today = isToday(date);
                const selected = isSelected(date);
                const dateKey = getDateKey(date);
                const hasNote = !!notes[dateKey];

                return (
                  <button
                    key={dateKey}
                    onClick={() => setSelectedDate(date)}
                    className={`aspect-square flex flex-col justify-center items-center rounded-xl text-xs font-bold transition-all relative cursor-pointer active:scale-90 ${
                      selected 
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md'
                        : today
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                          : 'text-brand-navy dark:text-white hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{date.getDate()}</span>
                    
                    {/* Note indicator dot */}
                    {hasNote && (
                      <span className={`absolute bottom-1 w-1 h-1 rounded-full ${
                        selected ? 'bg-white' : 'bg-emerald-500 dark:bg-emerald-400'
                      }`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Notes Workspace */}
          <div className="mt-5 bg-white dark:bg-brand-navy/60 border border-black/5 dark:border-white/5 rounded-3xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-bold text-brand-blue dark:text-brand-cyan">
                Notes for {monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}
              </span>
              {notes[getDateKey(selectedDate)] && (
                <button
                  onClick={handleDeleteNote}
                  className="flex items-center gap-1 text-[10px] text-red-500 dark:text-red-400 font-extrabold hover:underline"
                >
                  <Trash className="w-3 h-3" />
                  DELETE
                </button>
              )}
            </div>

            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write a scheduling note, team reminder, or task log..."
              rows={3}
              className="w-full p-3 bg-gray-50 dark:bg-[#030a17]/50 border border-black/5 dark:border-white/10 rounded-xl text-xs text-brand-navy dark:text-white placeholder-brand-secondary focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/20 transition-all duration-300 resize-none"
            />

            <button
              onClick={handleSaveNote}
              className="w-full flex items-center justify-center gap-2 mt-3.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold text-xs shadow-md active:scale-[0.98] transition-all"
            >
              <Save className="w-4 h-4" />
              Save Note
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
