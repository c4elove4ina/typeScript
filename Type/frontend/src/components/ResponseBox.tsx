import React from "react";

interface Props {
  title: string;
  data: unknown;
  error: string | null;
}

const ResponseBox: React.FC<Props> = ({ title, data, error }) => {
  if (!data && !error) return null;

  return (
    <div className={`response-box ${error ? "response-error" : "response-success"}`}>
      <p className="response-title">{title}</p>
      {error ? (
        <p className="response-text error-text">❌ {error}</p>
      ) : (
        <pre className="response-text">{JSON.stringify(data, null, 2)}</pre>
      )}
    </div>
  );
};

export default ResponseBox;
