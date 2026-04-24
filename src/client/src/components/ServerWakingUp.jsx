import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Zap, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2,
  Wifi,
  WifiOff,
  Loader2
} from 'lucide-react';

const ServerWakingUp = ({ 
  isVisible, 
  onRetry, 
  message = "Server is waking up...",
  showRetry = true,
  autoRetry = true,
  autoRetryDelay = 3000
}) => {
  const [retryCount, setRetryCount] = useState(0);
  const [isRetrying, setIsRetrying] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let interval;
    
    if (isVisible) {
      interval = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    } else {
      setTimeElapsed(0);
      setRetryCount(0);
    }

    return () => clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    if (autoRetry && isVisible && !isRetrying) {
      const timer = setTimeout(() => {
        handleRetry();
      }, autoRetryDelay);

      return () => clearTimeout(timer);
    }
  }, [isVisible, retryCount, autoRetry, autoRetryDelay, isRetrying]);

  const handleRetry = async () => {
    setIsRetrying(true);
    setRetryCount(prev => prev + 1);
    
    try {
      await onRetry();
    } catch (error) {
      console.error('Retry failed:', error);
    } finally {
      setIsRetrying(false);
    }
  };

  const formatTime = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const getLoadingMessage = () => {
    if (isRetrying) return "Checking server status...";
    if (retryCount > 0) return `Retrying... (Attempt ${retryCount + 1})`;
    if (timeElapsed > 30) return "Server is taking longer than usual...";
    return message;
  };

  const getStatusIcon = () => {
    if (isRetrying) {
      return <Loader2 className="w-8 h-8 animate-spin text-blue-500" />;
    }
    if (retryCount > 2) {
      return <AlertCircle className="w-8 h-8 text-orange-500" />;
    }
    return <Zap className="w-8 h-8 text-blue-500" />;
  };

  const getStatusColor = () => {
    if (retryCount > 2) return 'border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-900/20';
    return 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20';
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 max-w-md mx-4 border-2"
            style={{ borderColor: 'inherit' }}
          >
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${getStatusColor()}`}>
              {getStatusIcon()}
            </div>

            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Server Waking Up
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {getLoadingMessage()}
              </p>

              {/* Progress indicators */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Time elapsed</span>
                  <span>{formatTime(timeElapsed)}</span>
                </div>
                
                {retryCount > 0 && (
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <span>Retry attempts</span>
                    <span>{retryCount}</span>
                  </div>
                )}

                {/* Loading bar */}
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-blue-500 h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </div>
              </div>

              {/* Tips */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-3">
                  <WifiOff className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <p className="text-sm text-gray-600 dark:text-gray-300 font-medium mb-1">
                      Why this happens
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Free hosting services pause servers when inactive. 
                      The server needs a moment to start up.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              {showRetry && (
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleRetry}
                    disabled={isRetrying}
                    className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
                    {isRetrying ? 'Retrying...' : 'Retry Now'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.reload()}
                    className="px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    Reload
                  </motion.button>
                </div>
              )}

              {/* Auto-retry indicator */}
              {autoRetry && !isRetrying && retryCount === 0 && (
                <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  <span>Auto-retrying in {autoRetryDelay / 1000} seconds...</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServerWakingUp;
