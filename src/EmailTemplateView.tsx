import React, { useEffect, useState } from 'react';
import mondaySdk from 'monday-sdk-js';

const monday = mondaySdk();

const EmailTemplateView = () => {
  const [html, setHtml] = useState('');
  const [loading, setLoading] = useState(true);

  const rawHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 20px;
  background-color: #f8f9fa;
  color: #333;
  line-height: 1.6;
}
.email-header h1 { font-size: 28px; font-weight: 300; margin: 0; }
.email-body { padding: 30px; }
.greeting { font-size: 16px; margin-bottom: 20px; }
.intro-text { font-size: 16px; margin-bottom: 30px; color: #555; }
.projects-table th { background: #667eea; color: white; padding: 12px; }
.projects-table td { padding: 10px; font-size: 13px; }
</style>
</head>
<body>
<div style="max-width: 1200px; margin: 0 auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
  <div class="email-header" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center;">
    <h1>Weekly Executive Overview</h1>
    <p>USA and Canada Content Projects</p>
  </div>
  <div class="email-body">
    <div class="greeting">Hello {{name}},</div>
    <div class="intro-text">
      Please find below the weekly executive overview of USA and Canada Content projects.
    </div>
    <div style="background: #d4edda; padding: 15px; border-left: 4px solid #28a745; border-radius: 4px; margin-bottom: 20px;">
      <strong>Main Highlights</strong>
      <ul>
        <li><strong>RSI Delaware</strong>, kickoff meeting with licensee took place earlier this week</li>
        <li><strong>DraftKings Ontario</strong>, progressing well at 90% completion</li>
        <li><strong>Golden Nugget Ontario</strong>, on track for end of June 2025 launch</li>
      </ul>
    </div>
    <div style="background: #f8d7da; padding: 15px; border-left: 4px solid #dc3545; border-radius: 4px; margin-bottom: 30px;">
      <strong>Main Alerts</strong>
      <ul>
        <li><strong>Pala Canada (.com)</strong>, Live Casino, still no commitment from licensee on launch date</li>
        <li><strong>Hard Rock Florida</strong>, HSR project showing low progress at 15%</li>
        <li><strong>Rush Street Delaware</strong>, project at 0% - requires immediate attention</li>
      </ul>
    </div>
    <table class="projects-table" width="100%" border="1" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
      <thead>
        <tr>
          <th>Licensee / Brand</th>
          <th>Products</th>
          <th>Jurisdictions</th>
          <th>Status</th>
          <th>Progress</th>
          <th>Launch Date / Comments</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>DraftKings</td><td>Casino, Live</td><td>West Virginia</td><td>In Progress</td><td>70%</td><td>Mid-June 2025</td>
        </tr>
        <tr>
          <td>Golden Nugget</td><td>Casino, Live</td><td>West Virginia</td><td>In Progress</td><td>70%</td><td>Mid-June 2025</td>
        </tr>
        <tr>
          <td>Rush Street</td><td>Casino, Jackpot</td><td>Delaware</td><td>In Progress</td><td>0%</td><td>Q4 2025</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="footer" style="background: #f8f9fa; padding: 20px; text-align: center; font-size: 14px; color: #6c757d;">
    This report was generated automatically from Monday.com project data.
  </div>
</div>
</body>
</html>`;

  useEffect(() => {
    monday.listen("context", async (res) => {
      const itemId = res.data.itemId;
      try {
        const result = await monday.api(`query { items(ids: ${itemId}) { name } }`);
        const name = result.data.items[0].name;
        const processedHtml = rawHtml.replace('{{name}}', name);
        setHtml(processedHtml);
      } catch (error) {
        setHtml(rawHtml);
      }
      setLoading(false);
    });
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html);
    alert("HTML copied to clipboard");
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={copyToClipboard} style={{ marginBottom: '20px' }}>
        📋 Copy HTML
      </button>
      <iframe
        title="Email Preview"
        srcDoc={html}
        style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}
      />
    </div>
  );
};

export default EmailTemplateView;