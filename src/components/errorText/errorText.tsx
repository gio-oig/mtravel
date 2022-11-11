type ErrorTextProps = {
  errorText: string | string[] | undefined;
};

const ErrorText = ({ errorText }: ErrorTextProps) => {
  if (!errorText) <></>;
  return <p className="error-message">{errorText}</p>;
};

export default ErrorText;
