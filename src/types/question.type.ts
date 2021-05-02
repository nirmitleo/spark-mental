import { OperationType } from './operation-type.type';
import { Verdict } from './verdict.type';

export interface Question {
  serialID: number;
  operand1: number;
  operand2: number;
  result: number;
  operationType: OperationType.ADDITION | OperationType.MULTIPLICATION;
  verdict: Verdict;
}
