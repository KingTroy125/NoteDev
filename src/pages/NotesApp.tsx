import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Folder, Star, Archive, Settings, ChevronDown, Trash2, ArrowLeft, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
}

const NotesApp = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showNotesList, setShowNotesList] = useState(true);

  const addNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      date: new Date().toLocaleDateString(),
    };
    setNotes([newNote, ...notes]);
    setSelectedNote(newNote);
    setShowNotesList(false);
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter((note) => note.id !== noteId));
    if (selectedNote?.id === noteId) {
      setSelectedNote(null);
    }
  };

  const toggleMobileView = () => {
    if (selectedNote) {
      setShowNotesList(!showNotesList);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-screen bg-black text-white flex overflow-hidden"
    >
      {/* Mobile Sidebar Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          showSidebar ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 fixed lg:relative w-64 h-full border-r border-gray-800 p-4 bg-black transition-transform duration-200 ease-in-out z-30`}
      >
        <div className="flex items-center space-x-2 mb-8">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <span className="font-mono text-lg">NoteDev</span>
        </div>

        <button
          onClick={() => {
            addNote();
            setShowSidebar(false);
          }}
          className="w-full bg-white text-black py-2 rounded-md hover:bg-gray-200 transition-colors mb-6 flex items-center justify-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Note</span>
        </button>

        <div className="space-y-4">
          <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-white">
            <Search className="w-4 h-4" />
            <span>Search</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-white">
            <Folder className="w-4 h-4" />
            <span>All Notes</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-white">
            <Star className="w-4 h-4" />
            <span>Favorites</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-white">
            <Archive className="w-4 h-4" />
            <span>Archive</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-white">
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Top Bar */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-800">
          <button onClick={() => setShowSidebar(true)} className="p-2">
            <Menu className="w-6 h-6" />
          </button>
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Notes List */}
        <div
          className={`${
            showNotesList ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 w-full lg:w-72 border-r border-gray-800 lg:relative absolute inset-0 bg-black transition-transform duration-200 ease-in-out ${
            selectedNote ? 'lg:block' : 'block'
          }`}
        >
          <div className="p-4 border-b border-gray-800">
            <div className="hidden lg:flex items-center justify-between mb-4">
              <h2 className="font-semibold">All Notes</h2>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                className="w-full bg-gray-900 rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-700"
              />
            </div>
          </div>
          <div className="overflow-y-auto h-[calc(100vh-8rem)]">
            {notes.map((note) => (
              <div
                key={note.id}
                onClick={() => {
                  setSelectedNote(note);
                  toggleMobileView();
                }}
                className={`p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-900 ${
                  selectedNote?.id === note.id ? 'bg-gray-900' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium mb-1">{note.title}</h3>
                    <p className="text-sm text-gray-400">{note.date}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNote(note.id);
                    }}
                    className="p-1 hover:bg-gray-800 rounded-full text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div
          className={`${
            !showNotesList ? 'translate-x-0' : 'translate-x-full'
          } lg:translate-x-0 flex-1 absolute inset-0 lg:relative bg-black transition-transform duration-200 ease-in-out`}
        >
          <div className="flex items-center justify-between p-4 lg:hidden border-b border-gray-800">
            <button onClick={toggleMobileView} className="text-gray-400 hover:text-white">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="font-medium">{selectedNote?.title || 'Note'}</h2>
            <div className="w-5" />
          </div>
          <div className="p-6 h-[calc(100vh-4rem)] lg:h-screen overflow-y-auto">
            {selectedNote ? (
              <div className="h-full flex flex-col">
                <input
                  type="text"
                  value={selectedNote.title}
                  onChange={(e) => {
                    const updatedNote = { ...selectedNote, title: e.target.value };
                    setSelectedNote(updatedNote);
                    setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)));
                  }}
                  className="bg-transparent text-2xl font-medium mb-4 focus:outline-none"
                  placeholder="Note title"
                />
                <textarea
                  value={selectedNote.content}
                  onChange={(e) => {
                    const updatedNote = { ...selectedNote, content: e.target.value };
                    setSelectedNote(updatedNote);
                    setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)));
                  }}
                  className="flex-1 bg-transparent resize-none focus:outline-none"
                  placeholder="Start writing..."
                />
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                <p>Select a note or create a new one</p>
              </div>
            )}
          </div>
        </div>

        {/* Back to Home (Desktop) */}
        <div className="hidden lg:block absolute top-4 right-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotesApp;