import { useState } from 'react';
import { Check, Mail, Paperclip, RotateCcw } from 'lucide-react';

export function EmailPractice() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState('');
  const [result, setResult] = useState('');

  return (
    <section className="email-practice">
      <div className="email-practice-heading">
        <span className="icon-tile">
          <Mail size={22} />
        </span>
        <div>
          <h3>A safe place to practise.</h3>
          <p>
            Email simulation. No message is sent and no real file is uploaded.
          </p>
        </div>
      </div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(
            'Practice check complete: your draft has a subject, a message, and a sample attachment. In a real email, check the recipient and file before sending. Nothing has been sent.',
          );
        }}
      >
        <label htmlFor="practice-recipient">
          To <span>Fictional practice recipient</span>
        </label>
        <input
          id="practice-recipient"
          value="practice.teacher@example.com"
          readOnly
        />
        <label htmlFor="practice-subject">Subject</label>
        <input
          id="practice-subject"
          required
          maxLength={120}
          value={subject}
          onChange={(event) => {
            setSubject(event.target.value);
            setResult('');
          }}
          placeholder="My study materials"
        />
        <label htmlFor="practice-message">
          Message <span>Use sample information, not private details</span>
        </label>
        <textarea
          id="practice-message"
          required
          rows={4}
          maxLength={1200}
          value={message}
          onChange={(event) => {
            setMessage(event.target.value);
            setResult('');
          }}
          placeholder="Write a greeting, explain your attachment, and add a polite closing."
        />
        <label htmlFor="practice-attachment">
          <Paperclip size={13} />
          Sample attachment
        </label>
        <select
          id="practice-attachment"
          required
          value={attachment}
          onChange={(event) => {
            setAttachment(event.target.value);
            setResult('');
          }}
        >
          <option value="">Choose a simulated file</option>
          <option value="study">My study note.txt</option>
          <option value="outline">Lesson outline.pdf</option>
        </select>
        <div className="email-actions">
          <button className="button button-primary" type="submit">
            <Check size={15} />
            Check my practice draft
          </button>
          <button
            type="button"
            className="button button-secondary"
            onClick={() => {
              setSubject('');
              setMessage('');
              setAttachment('');
              setResult('');
            }}
          >
            <RotateCcw size={14} />
            Reset
          </button>
        </div>
        <p className="email-result" role="status">
          {result}
        </p>
      </form>
    </section>
  );
}
