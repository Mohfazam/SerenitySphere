import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ChatSettings;
  onSettingsChange: (settings: ChatSettings) => void;
}

export interface ChatSettings {
  responseSpeed: 'fast' | 'normal' | 'detailed';
  saveHistory: boolean;
  showTypingIndicator: boolean;
  quickReplies: string[];
  allowDataStorage: boolean;
  autoDeleteHistory: boolean;
}

export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  isOpen,
  onClose,
  settings,
  onSettingsChange,
}) => {
  const [localSettings, setLocalSettings] = React.useState<ChatSettings>(settings);
  const [quickReplyInput, setQuickReplyInput] = React.useState('');

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all chat history? This cannot be undone.')) {
      localStorage.removeItem('chatHistory');
      window.location.reload();
    }
  };

  const addQuickReply = () => {
    if (quickReplyInput.trim()) {
      setLocalSettings(prev => ({
        ...prev,
        quickReplies: [...prev.quickReplies, quickReplyInput.trim()]
      }));
      setQuickReplyInput('');
    }
  };

  const removeQuickReply = (index: number) => {
    setLocalSettings(prev => ({
      ...prev,
      quickReplies: prev.quickReplies.filter((_, i) => i !== index)
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Settings Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
              }
            }}
            exit={{ 
              opacity: 0,
              y: 20,
              scale: 0.95,
              transition: {
                duration: 0.2
              }
            }}
            className="relative w-full max-w-xl mx-4 bg-gray-800 shadow-2xl rounded-xl max-h-[85vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">🛠 Chatbot Settings</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-8">
                {/* Chat Preferences */}
                <section>
                  <h3 className="text-lg font-semibold text-white mb-4">💬 Chat Preferences</h3>
                  
                  <div className="space-y-4">
                    {/* Response Speed */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Response Speed
                      </label>
                      <select
                        value={localSettings.responseSpeed}
                        onChange={(e) => setLocalSettings(prev => ({
                          ...prev,
                          responseSpeed: e.target.value as ChatSettings['responseSpeed']
                        }))}
                        className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="fast">Fast</option>
                        <option value="normal">Normal</option>
                        <option value="detailed">Detailed</option>
                      </select>
                    </div>

                    {/* Message History Toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-300">Save Message History</span>
                      <button
                        onClick={() => setLocalSettings(prev => ({
                          ...prev,
                          saveHistory: !prev.saveHistory
                        }))}
                        className="text-purple-500 hover:text-purple-400 transition-colors"
                      >
                        {localSettings.saveHistory ? (
                          <ToggleRight className="w-6 h-6" />
                        ) : (
                          <ToggleLeft className="w-6 h-6" />
                        )}
                      </button>
                    </div>

                    {/* Clear History Button */}
                    <button
                      onClick={handleClearHistory}
                      className="flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Clear Chat History</span>
                    </button>

                    {/* Typing Indicator Toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-300">Show Typing Indicator</span>
                      <button
                        onClick={() => setLocalSettings(prev => ({
                          ...prev,
                          showTypingIndicator: !prev.showTypingIndicator
                        }))}
                        className="text-purple-500 hover:text-purple-400 transition-colors"
                      >
                        {localSettings.showTypingIndicator ? (
                          <ToggleRight className="w-6 h-6" />
                        ) : (
                          <ToggleLeft className="w-6 h-6" />
                        )}
                      </button>
                    </div>

                    {/* Quick Replies */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Quick Replies
                      </label>
                      <div className="flex space-x-2 mb-2">
                        <input
                          type="text"
                          value={quickReplyInput}
                          onChange={(e) => setQuickReplyInput(e.target.value)}
                          placeholder="Add quick reply..."
                          className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <button
                          onClick={addQuickReply}
                          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {localSettings.quickReplies.map((reply, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between bg-gray-700 rounded-lg px-4 py-2"
                          >
                            <span className="text-white">{reply}</span>
                            <button
                              onClick={() => removeQuickReply(index)}
                              className="text-red-400 hover:text-red-300 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Privacy & Security */}
                <section>
                  <h3 className="text-lg font-semibold text-white mb-4">🔒 Privacy & Security</h3>
                  
                  <div className="space-y-4">
                    {/* Data Storage Toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-300">Allow Data Storage</span>
                      <button
                        onClick={() => setLocalSettings(prev => ({
                          ...prev,
                          allowDataStorage: !prev.allowDataStorage
                        }))}
                        className="text-purple-500 hover:text-purple-400 transition-colors"
                      >
                        {localSettings.allowDataStorage ? (
                          <ToggleRight className="w-6 h-6" />
                        ) : (
                          <ToggleLeft className="w-6 h-6" />
                        )}
                      </button>
                    </div>

                    {/* Auto-Delete History Toggle */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-300">Auto-Delete History</span>
                      <button
                        onClick={() => setLocalSettings(prev => ({
                          ...prev,
                          autoDeleteHistory: !prev.autoDeleteHistory
                        }))}
                        className="text-purple-500 hover:text-purple-400 transition-colors"
                      >
                        {localSettings.autoDeleteHistory ? (
                          <ToggleRight className="w-6 h-6" />
                        ) : (
                          <ToggleLeft className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </div>
                </section>
              </div>

              {/* Save Button */}
              <div className="mt-8">
                <button
                  onClick={handleSave}
                  className="w-full flex items-center justify-center space-x-2 bg-purple-500 text-white rounded-lg px-4 py-2 hover:bg-purple-600 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Settings</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};