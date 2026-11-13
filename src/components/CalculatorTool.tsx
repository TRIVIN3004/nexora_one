import React, { useState } from 'react';
import { X, Calculator, Delete } from 'lucide-react';

interface CalculatorToolProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CalculatorTool: React.FC<CalculatorToolProps> = ({ isOpen, onClose }) => {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [equationLogs, setEquationLogs] = useState<string[]>([]);
  const [isResetOnNextDigit, setIsResetOnNextDigit] = useState(false);

  if (!isOpen) return null;

  // Pressing digits
  const handleDigit = (digit: string) => {
    if (display === '0' || isResetOnNextDigit) {
      setDisplay(digit);
      setIsResetOnNextDigit(false);
    } else {
      // Limit to 12 digits
      if (display.length < 12) {
        setDisplay(display + digit);
      }
    }
  };

  // Pressing decimal
  const handleDecimal = () => {
    if (isResetOnNextDigit) {
      setDisplay('0.');
      setIsResetOnNextDigit(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  // Pressing operators
  const handleOperator = (op: string) => {
    setFormula(display + ' ' + op + ' ');
    setIsResetOnNextDigit(true);
  };

  // Clearing everything
  const handleClear = () => {
    setDisplay('0');
    setFormula('');
  };

  // Delete last digit (Backspace)
  const handleDelete = () => {
    if (isResetOnNextDigit) return;
    if (display.length > 1) {
      setDisplay(display.slice(0, -1));
    } else {
      setDisplay('0');
    }
  };

  // Calculate result safely without eval
  const handleCalculate = () => {
    if (!formula) return;
    
    const parts = formula.trim().split(' ');
    if (parts.length < 2) return;

    const num1 = parseFloat(parts[0]);
    const op = parts[1];
    const num2 = parseFloat(display);

    if (isNaN(num1) || isNaN(num2)) return;

    let result = 0;
    switch (op) {
      case '+':
        result = num1 + num2;
        break;
      case '-':
        result = num1 - num2;
        break;
      case '*':
        result = num1 * num2;
        break;
      case '/':
        result = num2 !== 0 ? num1 / num2 : 0; // Prevent divide by zero
        break;
      case '%':
        result = num1 % num2;
        break;
      default:
        return;
    }

    // Format result nicely
    const resultStr = Number(result.toFixed(6)).toString(); // Remove trailing zeroes
    const equationText = `${formula}${display} = ${resultStr}`;
    
    // Add to session logs (limit to last 4 logs)
    setEquationLogs(prev => [equationText, ...prev].slice(0, 4));
    
    setDisplay(resultStr);
    setFormula('');
    setIsResetOnNextDigit(true);
  };

  const buttons = [
    { label: 'C', onClick: handleClear, type: 'action', style: 'text-red-500 hover:bg-red-500/10' },
    { label: '⌫', onClick: handleDelete, type: 'action', style: 'text-brand-blue dark:text-brand-cyan hover:bg-brand-blue/10 dark:hover:bg-brand-cyan/10' },
    { label: '%', onClick: () => handleOperator('%'), type: 'operator' },
    { label: '/', onClick: () => handleOperator('/'), type: 'operator' },
    
    { label: '7', onClick: () => handleDigit('7'), type: 'digit' },
    { label: '8', onClick: () => handleDigit('8'), type: 'digit' },
    { label: '9', onClick: () => handleDigit('9'), type: 'digit' },
    { label: '*', onClick: () => handleOperator('*'), type: 'operator' },
    
    { label: '4', onClick: () => handleDigit('4'), type: 'digit' },
    { label: '5', onClick: () => handleDigit('5'), type: 'digit' },
    { label: '6', onClick: () => handleDigit('6'), type: 'digit' },
    { label: '-', onClick: () => handleOperator('-'), type: 'operator' },
    
    { label: '1', onClick: () => handleDigit('1'), type: 'digit' },
    { label: '2', onClick: () => handleDigit('2'), type: 'digit' },
    { label: '3', onClick: () => handleDigit('3'), type: 'digit' },
    { label: '+', onClick: () => handleOperator('+'), type: 'operator' },
    
    { label: '0', onClick: () => handleDigit('0'), type: 'digit', doubleWidth: true },
    { label: '.', onClick: handleDecimal, type: 'digit' },
    { label: '=', onClick: handleCalculate, type: 'equals' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center p-0 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-brand-navy/60 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Main container */}
      <div className="w-full max-w-md bg-white dark:bg-brand-navy/95 border-t sm:border border-brand-cyan/20 rounded-t-[32px] sm:rounded-[32px] p-6 shadow-2xl z-10 transition-transform duration-300 transform translate-y-0 relative max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden">
        {/* Pull Down Pill */}
        <div className="w-12 h-1.5 bg-black/10 dark:bg-white/10 rounded-full mx-auto mb-4 sm:hidden cursor-pointer" onClick={onClose} />

        {/* Title */}
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 flex items-center justify-center">
              <Calculator className="w-5.5 h-5.5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-brand-navy dark:text-white leading-tight">Nexora Calculator</h3>
              <span className="text-[10px] text-brand-secondary font-semibold">Offline Utility Terminal</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-brand-secondary hover:text-brand-navy dark:hover:text-white transition-colors"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Content panel */}
        <div className="flex-grow overflow-y-auto no-scrollbar my-4 pr-1">
          
          {/* History Panel Logs */}
          {equationLogs.length > 0 && (
            <div className="bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-3 mb-3 text-right max-h-[85px] overflow-y-auto no-scrollbar flex flex-col gap-1 select-none">
              {equationLogs.map((log, index) => (
                <span key={index} className="text-[10px] text-brand-secondary font-mono leading-none">
                  {log}
                </span>
              ))}
            </div>
          )}

          {/* Calculator Screen Display */}
          <div className="bg-gray-100 dark:bg-[#030a17]/85 border border-black/5 dark:border-white/10 rounded-[24px] p-5 mb-4 text-right flex flex-col justify-end min-h-[100px] shadow-inner select-all relative overflow-hidden">
            <span className="text-[11px] font-extrabold text-brand-blue dark:text-brand-cyan font-mono tracking-wider h-5 block">
              {formula}
            </span>
            <span className="text-3xl font-black text-brand-navy dark:text-white font-mono break-all mt-1 truncate">
              {display}
            </span>
          </div>

          {/* Calculator Button Grid */}
          <div className="grid grid-cols-4 gap-2.5">
            {buttons.map((btn, index) => {
              const isOperator = btn.type === 'operator';
              const isEquals = btn.type === 'equals';
              
              let styleClasses = "h-14 rounded-2xl flex items-center justify-center text-sm font-extrabold cursor-pointer transition-all active:scale-90 ";
              
              if (isEquals) {
                styleClasses += "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-md";
              } else if (isOperator) {
                styleClasses += "bg-pink-500/10 dark:bg-pink-500/20 text-pink-600 dark:text-pink-400 hover:bg-pink-500/25";
              } else if (btn.style) {
                styleClasses += `bg-black/5 dark:bg-white/5 ${btn.style}`;
              } else {
                styleClasses += "bg-gray-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-brand-navy dark:text-white hover:bg-black/10 dark:hover:bg-white/10";
              }

              if (btn.doubleWidth) {
                styleClasses += " col-span-2";
              }

              return (
                <button
                  key={index}
                  onClick={btn.onClick}
                  className={styleClasses}
                >
                  {btn.label === '⌫' ? <Delete className="w-5 h-5" /> : btn.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
