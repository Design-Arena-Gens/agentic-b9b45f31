import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { message, history } = await req.json()

    // Simulate AI response with IT support context
    const responses = [
      {
        keywords: ['password', 'reset', 'login', 'forgot'],
        response: `I can help you with a password reset. Here's what I'll do:

1. **Verify your identity**: I've confirmed your user account in Active Directory
2. **Reset password**: Generating a temporary password
3. **Send credentials**: You'll receive an email at your registered address within 2 minutes
4. **Create ticket**: INC-${Math.floor(Math.random() * 9000) + 1000} has been created in ServiceNow

**Next Steps:**
- Check your email for the temporary password
- Log in and you'll be prompted to set a new password
- Password must be 12+ characters with uppercase, lowercase, number, and special character

**Ticket Priority:** Medium
**SLA:** 4 hours
**Status:** Resolved

Is there anything else you need help with?`
      },
      {
        keywords: ['vpn', 'connection', 'connect', 'network'],
        response: `I'll help troubleshoot your VPN connection issue. Let me run some diagnostics:

**Diagnostic Results:**
✓ Network connectivity: OK
✓ DNS resolution: OK
✓ Firewall rules: OK
⚠ VPN certificate: Expired (detected issue)

**Resolution:**
I've automatically renewed your VPN certificate and pushed the configuration to your device.

**Steps to reconnect:**
1. Close your current VPN client completely
2. Reopen the VPN client (Cisco AnyConnect)
3. Connect using your standard credentials
4. You should now be able to connect successfully

**Ticket Created:** INC-${Math.floor(Math.random() * 9000) + 1000}
**Priority:** High
**Status:** In Progress → Resolved
**Resolution Time:** 8 minutes

If the issue persists, please run the VPN diagnostic tool from your system tray and send me the log file.`
      },
      {
        keywords: ['vulnerability', 'cve', 'patch', 'security', 'update'],
        response: `I've analyzed the current vulnerability landscape for your environment:

**Critical Vulnerabilities Detected:**

🔴 **CVE-2024-1234** - Windows RCE Vulnerability
- Severity: Critical (CVSS 9.8)
- Affected: 12 domain controllers
- Remediation: Apply KB5034441 immediately
- Ticket: INC-${Math.floor(Math.random() * 9000) + 1000} created with Security Team

🟠 **CVE-2024-5678** - Chrome Browser Update
- Severity: High (CVSS 8.1)
- Affected: 45 workstations
- Remediation: Auto-update scheduled for tonight 11 PM
- Estimated completion: 2 hours

🟡 **CVE-2024-9012** - Adobe Reader
- Severity: Medium (CVSS 6.5)
- Affected: 8 workstations
- Remediation: Update pushed via SCCM

**Recommended Actions:**
1. Critical patches scheduled for emergency maintenance window
2. All affected systems will be patched within 24 hours
3. Compliance scan scheduled post-remediation

Would you like me to generate a detailed vulnerability report or create additional tickets?`
      },
      {
        keywords: ['printer', 'print', 'printing'],
        response: `I'll help you troubleshoot the printer issue. Let me check the printer status:

**Printer Diagnostics:**
- Printer: HP-LaserJet-Floor3-East
- Status: Online
- Queue: 3 stuck print jobs detected
- Driver: Up to date

**Actions Taken:**
✓ Cleared print queue
✓ Restarted print spooler service
✓ Reset printer connection
✓ Test page sent successfully

**Resolution:**
Your printer should now be working. The issue was caused by stuck print jobs in the queue blocking new jobs.

**Ticket:** INC-${Math.floor(Math.random() * 9000) + 1000}
**Priority:** Low
**Status:** Resolved
**Resolution Time:** 5 minutes

**Prevention Tips:**
- Avoid sending very large files (>50MB) to the printer
- If a job seems stuck, wait 2 minutes before resending
- Contact IT if you see recurring issues

Would you like me to add this printer to your favorites or configure any print preferences?`
      },
      {
        keywords: ['software', 'install', 'application', 'program'],
        response: `I can assist with your software installation request. Let me process this:

**Software Request Analysis:**
- Requested Application: [Based on your description]
- License Check: ✓ Available licenses in pool
- Security Scan: ✓ Approved by IT Security
- Compatibility: ✓ Compatible with Windows 11

**Installation Process:**
1. **Approval:** Auto-approved (standard software)
2. **Deployment:** Pushing via SCCM to your workstation
3. **Installation:** Will install during next system idle time or within 4 hours
4. **Configuration:** Default enterprise settings applied

**Ticket Created:** REQ-${Math.floor(Math.random() * 9000) + 1000}
**Type:** Service Request
**Priority:** Medium
**SLA:** 24 hours
**Expected Completion:** 4 hours

**What Happens Next:**
- You'll receive a notification when installation begins
- No restart required for most applications
- Software will appear in your Start menu automatically

**Need urgent installation?** I can schedule it for immediate deployment if this is business-critical.

Is there any specific configuration or additional software you need?`
      }
    ]

    // Find matching response based on keywords
    let aiResponse = responses.find(r =>
      r.keywords.some(keyword => message.toLowerCase().includes(keyword))
    )

    // Default response if no match
    if (!aiResponse) {
      aiResponse = {
        keywords: [],
        response: `Thank you for contacting IT Support. I understand you need assistance with: "${message}"

I'm analyzing your request and checking our systems. Based on the information provided, here's what I can help you with:

**Initial Assessment:**
- Issue Type: General Technical Support
- Priority: Medium (will be adjusted based on impact)
- Estimated Resolution Time: 2-4 hours

**Next Steps:**
1. I'm creating a ticket in ServiceNow: INC-${Math.floor(Math.random() * 9000) + 1000}
2. A Level 2 technician will be assigned within 30 minutes
3. You'll receive email updates at each stage

**What I Need From You:**
- Please provide any error messages or screenshots
- When did this issue first occur?
- Has this worked correctly before?

**Common Issues I Can Help With:**
- Password resets and account lockouts
- VPN and network connectivity
- Software installation and troubleshooting
- Hardware issues (laptop, printer, peripherals)
- Email and Office 365 problems
- Security and vulnerability concerns
- Access requests and permissions

Would you like me to escalate this to a specialist, or can you provide more details so I can assist you directly?`
      }
    }

    return NextResponse.json({ response: aiResponse.response })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}
