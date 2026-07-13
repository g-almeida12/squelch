import { QueryRunEntity } from "../index.js";

export type QueryValidationResult = {
  differenceInRows: number;
  differenceInColumns: number;
  missingFields: string[] | null;
  wrongField: string[] | null;
};

export function compareQueryResults(
  userAnswer: QueryRunEntity[],
  expectedAnswer: QueryRunEntity[],
): QueryValidationResult {
  const queryValidationResult: QueryValidationResult = {
    differenceInRows: 0,
    differenceInColumns: 0,
    missingFields: null,
    wrongField: null,
  };

  // Verify if the user result has more or less rows than expected
  const differenceInRows = userAnswer.length - expectedAnswer.length;
  queryValidationResult.differenceInRows = differenceInRows;

  // Verify if the user result has more or less columns than expected
  const differenceInColumns =
    (userAnswer.length > 0 ? Object.keys(userAnswer[0]) : []).length -
    (Object.keys(expectedAnswer[0])?.length ?? 0);
  queryValidationResult.differenceInColumns = differenceInColumns;

  if (differenceInColumns !== 0 || differenceInRows !== 0) {
    return queryValidationResult;
  }

  // Verify if the user result has missing fields
  const missingFields: string[] = [];
  const userFields = Object.keys(userAnswer[0]).sort();
  const expectedFields = Object.keys(expectedAnswer[0]).sort();

  for (let i = 0; i < expectedFields.length; i++) {
    if (expectedFields[i] !== userFields[i]) {
      missingFields.push(expectedFields[i]);
    }
  }

  if (missingFields.length > 0) {
    queryValidationResult.missingFields = missingFields;
    return queryValidationResult;
  }

  // verify if the user result's values are correct
  const wrongField: string[] = [];
  const userSet: Set<string> = new Set(
    userAnswer.map((row) =>
      userFields.map((f) => `${f}:[${row[f]}]`).join("|"),
    ),
  );
  for (let i = 0; i < expectedAnswer.length; i++) {
    const stringObj = expectedFields
      .map((f) => `${f}:[${expectedAnswer[i][f]}]`)
      .join("|");

    if (!userSet.has(stringObj)) {
      wrongField.push(expectedFields[0]);
    }
  }

  if (wrongField.length > 0) {
    queryValidationResult.wrongField = wrongField;
  }

  return queryValidationResult;
}
