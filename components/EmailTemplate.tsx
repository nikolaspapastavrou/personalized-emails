import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  content?: string;
}

const defaultFooter = "WarmEmailLeads.com - Personalization in emails leads at scale on autopilot.";

export const FirstEmailTemplate: React.FC<Readonly<{firstName: string}>> = ({
  firstName,
}) => (
  <div>
    <p>Hey, {firstName}!</p>
    <p>I hope this email finds you well. I wanted to reach out and introduce you to WarmEmailLeads.com – your ultimate solution for outbound email campaigns.</p>
    <p>Our cutting-edge platform harnesses the power of artificial intelligence to help agencies like yours generate quality leads and achieve remarkable results.</p>
    <p>I'd love to schedule a quick call to provide you with more information on how WarmEmailLeads.com can empower your agency. Let me know a convenient time, and I'll be happy to accommodate your schedule.</p>
    <p>{defaultFooter}</p>
  </div>
);


export const ResponseTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  content,
}) => (
  <div>
    <p>{content || ""}</p>
    <p>{defaultFooter}</p>
  </div>
);
