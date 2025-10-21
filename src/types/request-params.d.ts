interface ConsultStreamRequestParams {
  question: string;
}

interface AnalysisSemanticsRequestParams {
  question: string;
}

interface HelperDisclosureStreamRequestParams {
  question: string;
}

interface HelperPatentStreamRequestParams {
  question: string;
}

interface SearchPatentsRequestParams {
  [key: string]: string;
}

interface SearchStrategyRequestParams {
  question: string;
}

interface FileGenerateRequestParams {
  fileName?: string;
  jsonData: unknown;
}
