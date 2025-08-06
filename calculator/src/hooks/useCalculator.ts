'use client'

import { useState, useCallback } from 'react'

export type Operation = '+' | '-' | '*' | '/' | null

interface CalculatorState {
  display: string
  previousValue: number | null
  operation: Operation
  waitingForNewValue: boolean
}

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>({
    display: '0',
    previousValue: null,
    operation: null,
    waitingForNewValue: false,
  })

  const inputNumber = useCallback((num: string) => {
    setState(prev => {
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          display: num,
          waitingForNewValue: false,
        }
      }

      const newDisplay = prev.display === '0' ? num : prev.display + num
      
      return {
        ...prev,
        display: newDisplay,
      }
    })
  }, [])

  const inputDecimal = useCallback(() => {
    setState(prev => {
      if (prev.waitingForNewValue) {
        return {
          ...prev,
          display: '0.',
          waitingForNewValue: false,
        }
      }

      if (prev.display.includes('.')) {
        return prev
      }

      return {
        ...prev,
        display: prev.display + '.',
      }
    })
  }, [])

  const clear = useCallback(() => {
    setState({
      display: '0',
      previousValue: null,
      operation: null,
      waitingForNewValue: false,
    })
  }, [])

  const performOperation = useCallback((nextOperation: Operation) => {
    setState(prev => {
      const inputValue = parseFloat(prev.display)

      if (prev.previousValue === null) {
        return {
          ...prev,
          previousValue: inputValue,
          operation: nextOperation,
          waitingForNewValue: true,
        }
      }

      if (prev.operation && prev.waitingForNewValue) {
        return {
          ...prev,
          operation: nextOperation,
        }
      }

      const currentValue = prev.previousValue || 0
      let result = currentValue

      switch (prev.operation) {
        case '+':
          result = currentValue + inputValue
          break
        case '-':
          result = currentValue - inputValue
          break
        case '*':
          result = currentValue * inputValue
          break
        case '/':
          result = inputValue !== 0 ? currentValue / inputValue : currentValue
          break
        default:
          result = inputValue
      }

      return {
        display: String(result),
        previousValue: result,
        operation: nextOperation,
        waitingForNewValue: true,
      }
    })
  }, [])

  const calculate = useCallback(() => {
    setState(prev => {
      const inputValue = parseFloat(prev.display)
      
      if (prev.previousValue === null || prev.operation === null) {
        return prev
      }

      const currentValue = prev.previousValue
      let result = currentValue

      switch (prev.operation) {
        case '+':
          result = currentValue + inputValue
          break
        case '-':
          result = currentValue - inputValue
          break
        case '*':
          result = currentValue * inputValue
          break
        case '/':
          result = inputValue !== 0 ? currentValue / inputValue : currentValue
          break
      }

      return {
        display: String(result),
        previousValue: null,
        operation: null,
        waitingForNewValue: true,
      }
    })
  }, [])

  return {
    display: state.display,
    inputNumber,
    inputDecimal,
    clear,
    performOperation,
    calculate,
  }
}