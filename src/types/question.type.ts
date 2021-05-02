import { Verdict } from './verdict.type';

export interface Question {
  index: number;
  operand1: number;
  operand2: number;
  result: number;
  verdict: Verdict;
}
