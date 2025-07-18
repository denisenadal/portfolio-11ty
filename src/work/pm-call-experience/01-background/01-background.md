---
title: "Background"
name: "background"
date: 2019-11-30
draft: false
order: 1
columns: "col-12"
---
<div class="container lg"><div class="container gap-1">
<div class="col col-12 col-12 md-8 xl-7 mb-2">

Every app or product or service has a workflow that is critical to its success. For Field Management Software there are two; one each for its 2 primary user groups.  For CSR's the most important task is to be able to efficiently answer a phone call and schedule work. For the technicians in the field, it's efficiently working through the tasks necessary to complete a job.

Our mobile app did a good job of leading technicians through all the steps needed to work a job. Our desktop app, for the CSR's and dispatchers, didn't work so well. 

It was a big problem to solve and it was at the heart of our application, and fixing it could possibly require rebuilding the app from the ground up. We made several attempts at addressing this issue, some successful, and other not; in the "Process" section I provide an overview of what we tried.

### Atypical Navigation & UI conventions.

The "Answer a Call and Schedule Work" task had major usability issues when we started examining it. For new users, it was difficult **to understand how to navigate the screens** to find the information you needed and complete the steps in the task. Oftentimes, the visual cues were confusing, and you weren't sure you completed the action you thought you did. Even for experienced users, buttons often didn't do what you expected.

### Usability Testing

We also conducted a usability test, tracking how long it took users to complete the task of looking up a customer and scheduling work at their home. We were shocked to find that it took an **average 17 clicks, and up to 30 clicks in some cases -** the fastest it could be done was in 11 clicks. 

It was clear that we needed to make this process simpler and faster; if we're expecting users to complete this task dozens of times a day, it needs to be a great experience.
</div>
<div class="col col-12 md-4 xl-5 mb-2">
    {%- workimage "/work/pm-call-experience/01-background/pm-dispatchboard-desktop.png", "figure text-muted mb-2", "screenshot of the dispatch board", "the home page of the desktop app was visually confusing. From this screen, a dispatcher or CSR would answer calls and schedule work"  -%}
    {%- workimage "/work/pm-call-experience/01-background/pm-contactproperty-dialog.png", "figure text-muted mb-2", "screenshot of how our app displays information about a person or house.", "how our app displays information about a person or house. The information about a person or their home would be spread out across several different tabs, making it hard to get a clear picture."  -%}
</div>
</div></div>
