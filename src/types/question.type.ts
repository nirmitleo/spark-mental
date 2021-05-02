export interface Question {
  serialID: number;
  operand1: number;
  operand2: number;
  result: number;
  operationType: OperationType.ADDITION | OperationType.MULTIPLICATION;
}
