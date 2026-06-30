// Automation case studies, in SCAR format (Situation → Task → Action → Result).
//
// Kept as a SEPARATE module from resume.ts on purpose: these are NOT pushed
// through buildPosts(), so they never flood the home "All" feed. They render
// only on the /projects/ai-automation/ category page via <AutomationCard>.
//
// Source of truth for automation-projects.md (regenerate that doc from here).

export interface AutomationProject {
  title: string;
  /** Sub-category, e.g. "GoHighLevel Automation". */
  subcategory: string;
  featured: boolean;
  situation: string;
  task: string;
  /** Bullet list of actions taken. */
  action: string[];
  /** Bullet list of measurable results. */
  result: string[];
  tags: string[];
}

export const automationProjects: AutomationProject[] = [
  {
    title: 'Fitness Gym "No-Show" Reduction Funnel',
    subcategory: "GoHighLevel Automation",
    featured: true,
    situation:
      'A local boutique gym generating leads through Facebook ads was experiencing a 40% drop-off rate, with prospects failing to show up for their booked "Free Introductory Class."',
    task:
      'Build a high-converting booking funnel and a multi-channel "anti-ghosting" automation sequence to nurture leads, reduce no-shows, and automatically recover missed inbound calls.',
    action: [
      "Conversion Funnel Setup: Developed a 3-step funnel featuring a targeted landing page, native calendar booking integration, and a clear next-steps thank-you page.",
      'Trigger Setup: Primary workflow activates immediately when a prospect’s appointment status in the Free Intro Class calendar changes to "Confirmed".',
      'Pipeline & Tagging: Instantly assign a "Class: Booked" tag to the contact record and move the lead to the corresponding stage in the Sales Pipeline for clear front-desk visibility.',
      "Immediate Confirmation: Send an instant SMS confirming the booking time and prompting a 'YES' reply to lock in client commitment.",
      '24-Hour Nurture: Wait until 24 hours before the class, then deploy an email containing a facility tour and "what to expect" video to build excitement and reduce anxiety.',
      "1-Hour Final Push: Wait until 1 hour before the class, then send a final SMS reminder containing a direct Google Maps link for easy, frictionless navigation.",
      'Safety Net Setup: Implemented a secondary "Missed Call Text-Back" workflow to instantly text any inbound callers who hit a busy line or voicemail, ensuring zero lost leads.',
    ],
    result: [
      "Increased intro class show-up rates by over 50%.",
      "Doubled the overall conversion rate of digital leads into paying gym members.",
      "Eliminated lead leakage from missed front-desk phone calls.",
    ],
    tags: [
      "GoHighLevel",
      "Funnels",
      "Calendars",
      "Workflows",
      "SMS Automation",
      "Missed Call Text-Back",
    ],
  },
  {
    title: "Automated Fitness Client Onboarding Engine",
    subcategory: "GoHighLevel Automation",
    featured: true,
    situation:
      "Health and fitness coaches were losing up to 3 hours per new client manually sending intake forms, assigning workout plans, and setting up access credentials, leading to onboarding friction and delayed program starts.",
    task:
      "Create a seamless, native GoHighLevel automation to instantly onboard new clients upon package purchase, grant immediate program access, and organize the coach's CRM pipeline without manual intervention.",
    action: [
      'Trigger Setup: Workflow activates immediately upon a successful "Order Form Submission" for the 12-Week Transformation Coaching package.',
      'Segmentation & Tagging: Instantly apply "Client: Active" and "Program: 12-Week" tags to the contact record for clean CRM segmentation.',
      'Pipeline Management: Automatically create and move the client’s opportunity card to the "New Client - Onboarding" stage in the Active Roster pipeline.',
      "Instant Fulfillment: Grant immediate access to the specified Membership/Course area containing their digital workout and nutrition vault.",
      "Welcome Sequence: Send a personalized welcome email dynamically inserting their name, along with auto-generated membership login credentials and a link to the portal.",
      "Team Notification: Send an internal notification to the assigned coach alerting them of the new signup and prompting a review of the client’s submitted intake questionnaire.",
    ],
    result: [
      "Reduced client onboarding time from 3 hours to zero manual intervention.",
      "Eliminated login credential errors by automating membership delivery.",
      "Improved initial client satisfaction and engagement by providing immediate access to purchased assets.",
    ],
    tags: [
      "GoHighLevel",
      "Funnels",
      "Order Forms",
      "Workflows",
      "Memberships",
      "Pipelines",
      "Custom Values",
    ],
  },
  {
    title: "Intelligent Sales Ops",
    subcategory: "Revenue Operations",
    featured: true,
    situation:
      "A mid-sized consulting firm was losing deals due to manual follow-up lag (avg 2hrs/day lost per rep).",
    task:
      'Create a "Zero-Touch" post-call system to eliminate admin work and speed up speed-to-lead.',
    action: [
      "n8n Trigger: Webhook receives call completion event from VoIP system.",
      "Whisper Transcription: Audio file sent to OpenAI Whisper for high-fidelity transcription.",
      "GPT-4 Extraction: Extracted action items, sentiment, and key objections.",
      "GHL Update: Automatically updated CRM contact card with notes and tags.",
      'Slack Alert: Notified sales manager of "Hot Leads" instantly.',
      "Draft Email: Generated a personalized follow-up draft in Gmail for the rep.",
    ],
    result: [
      "Saved 10+ hours per week per rep.",
      "Increased Close Rate by 20% due to instant follow-up context.",
    ],
    tags: ["n8n", "OpenAI", "GoHighLevel", "Slack"],
  },
  {
    title: "E-commerce Order Fulfillment Automation",
    subcategory: "E-commerce Operations",
    featured: false,
    situation:
      "Online store was manually processing 30+ daily orders, causing 4-hour shipping delays and frequent inventory sync errors between Shopify and warehouse system.",
    task:
      "Build a zero-touch order processing system that instantly syncs inventory, notifies warehouse, and updates customers automatically.",
    action: [
      "Zapier Trigger: New order placed in Shopify.",
      "Inventory Update: Automatically decrements stock count in Google Sheets inventory tracker.",
      "Warehouse Alert: Creates fulfillment task in Trello with order details and shipping address.",
      "Customer Communication: Sends order confirmation email via Gmail with tracking number placeholder.",
      "Team Notification: Posts high-value orders ($200+) to Slack #fulfillment channel.",
      "Accounting Sync: Adds order data to QuickBooks for automatic invoicing.",
    ],
    result: [
      "Reduced order processing time from 4 hours to 3 minutes.",
      "Eliminated 95% of inventory sync errors.",
      "Enabled same-day shipping for 80% of orders.",
    ],
    tags: [
      "Zapier",
      "Shopify",
      "Google Sheets",
      "Trello",
      "Gmail",
      "Slack",
      "QuickBooks",
    ],
  },
  {
    title: "AI Ops & Inbox Manager",
    subcategory: "Productivity & DevOps",
    featured: false,
    situation:
      "Critical site alerts were getting buried in a cluttered inbox, causing delayed responses. Manual ticket creation for every Site24x7 alert was inefficient.",
    task:
      "Build a unified command center that autonomously manages emails and converts monitoring alerts into assignable actions.",
    action: [
      "Inbox Agent: n8n + Gemini 2.5 Flash analyzes emails to categorize leads and draft context-aware replies.",
      "Incident Listener: Established a webhook to capture real-time alerts from Site24x7 monitoring.",
      "Notion Auto-Ticketing: Automatically parses alert payloads to create detailed tasks in Notion DB.",
      "Smart Assignment: Logic routes tickets to specific assignees based on alert type and sets priority levels.",
    ],
    result: [
      "Reduced Mean Time to Acknowledge (MTTA) incidents by 90%.",
      "Eliminated manual data entry for both emails and ticket creation.",
    ],
    tags: ["n8n", "Gmail", "Gemini 2.5 Flash", "AI Agent"],
  },
  {
    title: "AI Voice Receptionist",
    subcategory: "Voice AI",
    featured: false,
    situation:
      "Service businesses lose 30% of revenue to missed calls. A local clinic was missing 40% of leads after-hours due to lack of coverage.",
    task:
      'Engineer a hyper-realistic, "Always-On" voice agent to handle inquiries, manage the calendar, and sync data instantly.',
    action: [
      "Voice Engine: Integrated VAPI with deep-prompting to handle interruptions, accents, and context-switching naturally.",
      "Real-Time Logic: n8n workflow cross-references Google Calendar in <800ms during the call to prevent double-booking.",
      "Complex Flow: Handles Booking, Rescheduling, and Cancellations autonomously within a single session.",
      "Data Sync: Automatically creates/updates Airtable records with call transcripts and outcome tags.",
    ],
    result: [
      "Zero Missed Calls: Achieved 100% 24/7 coverage immediately.",
      "Seamless CX: Customers successfully booked appointments without realizing they spoke to an AI.",
    ],
    tags: ["n8n", "VAPI", "Google Calendar", "Airtable", "Javascript"],
  },
  {
    title: "Lead Capture & CRM Automation",
    subcategory: "Marketing Automation",
    featured: false,
    situation:
      "A digital marketing agency was manually transferring 50+ daily form submissions across 4 platforms, causing 2-3 hour delays in lead response and frequent data entry errors.",
    task:
      "Build a zero-touch lead capture system that instantly syncs data across all platforms and triggers immediate follow-up sequences.",
    action: [
      "Zapier Trigger: Captures new Google Forms submissions in real-time.",
      "Multi-Platform Sync: Automatically creates/updates contacts in GoHighLevel CRM and adds rows to Google Sheets tracking database.",
      "Instant Communication: Sends personalized welcome email via Gmail using form data variables.",
      "Team Notification: Posts lead details to dedicated Slack channel with priority tagging.",
      "Marketing Integration: Adds contact to ConvertKit email sequence based on lead source.",
    ],
    result: [
      "Reduced lead response time from 2-3 hours to under 30 seconds.",
      "Eliminated 100% of manual data entry errors.",
      "Enabled team to handle 3x more leads without additional headcount.",
    ],
    tags: [
      "Zapier",
      "GoHighLevel",
      "Google Sheets",
      "Gmail",
      "Slack",
      "ConvertKit",
    ],
  },
  {
    title: "Meeting Scheduler & Follow-up System",
    subcategory: "Productivity Automation",
    featured: false,
    situation:
      "Sales team was spending 45 minutes per meeting on pre-call prep, note-taking setup, and post-call follow-ups, leading to inconsistent documentation and missed action items.",
    task:
      "Create an intelligent meeting orchestration system that handles all pre-meeting prep, real-time notifications, and post-meeting workflows automatically.",
    action: [
      "Calendar Trigger: Monitors Google Calendar for new/updated events and extracts meeting metadata.",
      "Auto-Documentation: Generates pre-formatted meeting notes template in Google Docs with attendee info and agenda.",
      "Smart Reminders: Sends customized reminder emails 1 hour before meeting with Zoom link and prep materials.",
      "Team Coordination: Posts meeting alerts to relevant Slack channels with @mentions for required attendees.",
      "Task Management: Creates follow-up tasks in Asana with due dates and assigns to meeting owner.",
      "CRM Integration: Logs meeting activity to GoHighLevel contact timeline for complete customer journey tracking.",
    ],
    result: [
      "Saved 45 minutes per meeting across 12-person sales team (90+ hours/month).",
      "Increased follow-up task completion rate from 60% to 95%.",
      "Achieved 100% meeting documentation compliance.",
    ],
    tags: [
      "Zapier",
      "Google Calendar",
      "Google Docs",
      "Gmail",
      "Slack",
      "Asana",
      "GoHighLevel",
    ],
  },
  {
    title: "Smart Lead Nurture & Re-engagement System",
    subcategory: "GoHighLevel Automation",
    featured: false,
    situation:
      "Marketing agency had 40% of leads going cold after initial contact, with no systematic follow-up process, resulting in lost revenue opportunities.",
    task:
      "Build an intelligent multi-channel re-engagement system using native GHL workflows to automatically nurture cold leads back to warm status.",
    action: [
      'Workflow Trigger: Activated when contact tagged as "Cold Lead" or "No Response".',
      "Multi-Touch Sequence: 3-day wait → personalized SMS, 2-day wait → email with case study, 5-day wait → task assigned to sales rep.",
      'Engagement Detection: If contact opens email → auto-remove "Cold" tag, add "Warm" tag, trigger new nurture workflow.',
      "Response Handling: If contact replies to SMS → create opportunity in pipeline, send Slack notification to sales manager.",
      'Auto-Archive: After 14 days with no engagement → move to "Archive" pipeline stage for future campaigns.',
    ],
    result: [
      "Re-engaged 28% of cold leads within 14 days.",
      "Generated $45K in recovered pipeline value in first month.",
      "Reduced manual follow-up work by 15 hours/week.",
    ],
    tags: [
      "GoHighLevel",
      "Workflows",
      "SMS",
      "Email",
      "Pipeline Management",
    ],
  },
  {
    title: "Automated Appointment No-Show Recovery",
    subcategory: "GoHighLevel Automation",
    featured: false,
    situation:
      "Healthcare clinic experienced 25% no-show rate costing $8K/month in lost revenue, with no automated recovery process in place.",
    task:
      "Create a native GHL automation to instantly recover no-show appointments through multi-channel outreach and intelligent tracking.",
    action: [
      'Trigger Setup: Workflow activates immediately when appointment status changes to "No Show".',
      'Instant Recovery: Send apology SMS with one-click rescheduling link, add "No-Show" tag to contact record.',
      "Follow-up Sequence: 2-hour wait → email with calendar link and 10% discount incentive.",
      "Task Creation: Auto-assign follow-up call task to sales rep with 24-hour deadline.",
      'Smart Tracking: Update custom field "No-Show Count" and if count ≥ 3 → move to "High Risk" pipeline, notify manager.',
      'Success Path: If contact reschedules → remove "No-Show" tag, add "Rescheduled" tag, send confirmation.',
    ],
    result: [
      "Recovered 42% of no-show appointments within 48 hours.",
      "Reduced no-show rate from 25% to 14%.",
      "Saved $3,360/month in recovered revenue.",
    ],
    tags: [
      "GoHighLevel",
      "Appointments",
      "Workflows",
      "Custom Fields",
      "SMS Automation",
    ],
  },
  {
    title: "Pipeline Stage Automation with Auto-Qualification",
    subcategory: "GoHighLevel Automation",
    featured: false,
    situation:
      "B2B sales team was manually moving 200+ opportunities through pipeline stages, causing inconsistent qualification and 30% of deals stalling due to missing information.",
    task:
      "Engineer an intelligent pipeline automation system that auto-qualifies leads, enforces data completeness, and prevents deal stagnation.",
    action: [
      "New Opportunity Trigger: Workflow activates on opportunity creation, checks for required fields (phone, email, budget).",
      "Data Validation: If phone missing → send form request via email; if budget empty → trigger qualification SMS sequence.",
      'Auto-Progression: Automatically move to "Qualified" stage when all required custom fields are complete.',
      "Stage-Specific Actions: Send tailored email sequences based on current pipeline position (Qualified, Proposal, Negotiation).",
      'Stagnation Prevention: If opportunity stuck in "Proposal Sent" for 5+ days → send SMS reminder + create urgent follow-up task.',
      'Outcome Automation: Won deals → thank you email + "Customer" tag + onboarding workflow; Lost deals → 6-month re-engagement campaign.',
    ],
    result: [
      "Increased pipeline velocity by 35% through automated progression.",
      "Reduced stalled deals from 30% to 8%.",
      "Improved data completeness from 60% to 98%.",
    ],
    tags: [
      "GoHighLevel",
      "Pipeline Automation",
      "Workflows",
      "Custom Fields",
      "Opportunity Management",
    ],
  },
  {
    title: "Review Request & Reputation Management",
    subcategory: "GoHighLevel Automation",
    featured: false,
    situation:
      "Local service business had only 12 Google reviews despite 200+ happy customers, limiting online visibility and losing leads to competitors with better ratings.",
    task:
      "Build an automated reputation management system that captures feedback, routes happy customers to review platforms, and alerts team to unhappy customers.",
    action: [
      'Trigger Setup: Workflow activates when opportunity marked "Won" or contact tagged "Happy Customer".',
      "Feedback Collection: 3-day wait → send SMS with 1-10 satisfaction survey via GHL form.",
      "Smart Routing: Score ≥8 → email with Google/Facebook review links; Score ≤6 → create urgent task for customer success manager + apology email.",
      "Follow-up Sequence: If no review after 7 days → send gentle reminder SMS with incentive.",
      'Success Tracking: Review submitted → add "Reviewer" tag, send thank you email with referral bonus.',
      'Data Management: Update custom fields "Review Status", "NPS Score", and "Last Review Request Date".',
    ],
    result: [
      "Generated 47 new 5-star Google reviews in 60 days.",
      "Increased average rating from 3.8 to 4.7 stars.",
      "Identified and resolved 8 at-risk customers before they churned.",
    ],
    tags: [
      "GoHighLevel",
      "Reputation Management",
      "Workflows",
      "Forms",
      "Customer Success",
    ],
  },
  {
    title: "Closed Deal Onboarding Automator",
    subcategory: "Sales Operations",
    featured: false,
    situation:
      "Marketing agency was manually setting up client folders, contracts, and team notifications for every new deal, taking 2+ hours per client and causing onboarding delays that frustrated new customers.",
    task:
      'Build a zero-touch onboarding system that instantly provisions all client resources the moment a deal is marked "Won" in GoHighLevel.',
    action: [
      'Zapier Trigger: Monitors GoHighLevel for opportunity status changes to "Won".',
      'Folder Creation: Automatically creates organized Google Drive folder named "{Client Name} - Assets" with proper permissions.',
      "Contract Generation: Generates customized contract in PandaDoc using client details from GHL (name, email, services, pricing).",
      'Team Notification: Posts celebration message to Slack #sales-wins channel: "New Client {Client Name} closed! Contract sent."',
      'CRM Update: Updates GoHighLevel custom field "Contract Status" to "Sent" and adds "Onboarding" tag to contact.',
      "Audit Trail: Logs all actions to Google Sheets for compliance and tracking.",
    ],
    result: [
      "Reduced onboarding setup time from 2+ hours to 90 seconds.",
      "Eliminated manual errors in contract generation and folder setup.",
      "Improved new client experience with instant contract delivery.",
    ],
    tags: ["Zapier", "GoHighLevel", "PandaDoc", "Google Drive", "Slack"],
  },
];
