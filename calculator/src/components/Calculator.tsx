'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCalculator, Operation } from '@/hooks/useCalculator'
import { Calculator as CalculatorIcon, Divide, Minus, Plus, X, Delete } from 'lucide-react'

export function Calculator() {
  const { display, inputNumber, inputDecimal, clear, performOperation, calculate } = useCalculator()

  const handleNumberClick = (num: string) => {
    inputNumber(num)
  }

  const handleOperationClick = (op: Operation) => {
    performOperation(op)
  }

  const formatDisplay = (value: string) => {
    // 限制显示长度，避免溢出
    if (value.length > 12) {
      const num = parseFloat(value)
      if (num > 999999999999) {
        return num.toExponential(6)
      }
      return num.toString().slice(0, 12)
    }
    return value
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-2xl border-0">
        <CardHeader className="text-center pb-4">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-800 dark:text-gray-100">
            <CalculatorIcon className="w-6 h-6 text-blue-600" />
            计算器
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Display */}
          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 text-right">
            <div className="text-3xl font-mono font-bold text-gray-800 dark:text-gray-100 min-h-[3rem] flex items-center justify-end">
              {formatDisplay(display)}
            </div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* First Row */}
            <Button
              variant="secondary"
              size="lg"
              onClick={clear}
              className="col-span-2 h-14 text-lg font-semibold bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-900/30 dark:hover:bg-red-900/50 dark:text-red-300"
            >
              <Delete className="w-5 h-5 mr-2" />
              清空
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleOperationClick('/')}
              className="h-14 text-lg font-semibold bg-orange-100 hover:bg-orange-200 text-orange-700 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 dark:text-orange-300"
            >
              <Divide className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleOperationClick('*')}
              className="h-14 text-lg font-semibold bg-orange-100 hover:bg-orange-200 text-orange-700 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 dark:text-orange-300"
            >
              <X className="w-5 h-5" />
            </Button>

            {/* Second Row */}
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleNumberClick('7')}
              className="h-14 text-xl font-semibold"
            >
              7
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleNumberClick('8')}
              className="h-14 text-xl font-semibold"
            >
              8
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleNumberClick('9')}
              className="h-14 text-xl font-semibold"
            >
              9
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleOperationClick('-')}
              className="h-14 text-lg font-semibold bg-orange-100 hover:bg-orange-200 text-orange-700 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 dark:text-orange-300"
            >
              <Minus className="w-5 h-5" />
            </Button>

            {/* Third Row */}
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleNumberClick('4')}
              className="h-14 text-xl font-semibold"
            >
              4
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleNumberClick('5')}
              className="h-14 text-xl font-semibold"
            >
              5
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleNumberClick('6')}
              className="h-14 text-xl font-semibold"
            >
              6
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleOperationClick('+')}
              className="h-14 text-lg font-semibold bg-orange-100 hover:bg-orange-200 text-orange-700 dark:bg-orange-900/30 dark:hover:bg-orange-900/50 dark:text-orange-300"
            >
              <Plus className="w-5 h-5" />
            </Button>

            {/* Fourth Row */}
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleNumberClick('1')}
              className="h-14 text-xl font-semibold"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleNumberClick('2')}
              className="h-14 text-xl font-semibold"
            >
              2
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleNumberClick('3')}
              className="h-14 text-xl font-semibold"
            >
              3
            </Button>
            <Button
              variant="default"
              size="lg"
              onClick={calculate}
              className="h-14 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold"
            >
              =
            </Button>

            {/* Fifth Row */}
            <Button
              variant="outline"
              size="lg"
              onClick={() => handleNumberClick('0')}
              className="col-span-2 h-14 text-xl font-semibold"
            >
              0
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={inputDecimal}
              className="h-14 text-xl font-semibold"
            >
              .
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}