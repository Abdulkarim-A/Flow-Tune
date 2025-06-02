// src/pages/DataBehaviorModelsPage.js
import React, { useState } from 'react';
import Card from '../components/Card';
import TabbedInterface from '../components/TabbedInterface';
import '../styles/pages.css'; // Import page-specific styles

const DataBehaviorModelsPage = () => {
  const [researchNotes, setResearchNotes] = useState("");
  const [segmentationNotes, setSegmentationNotes] = useState("");

  // Example data for behavior models
  const behaviorModels = [
    {
      id: 'fogg',
      name: 'Fogg Behavior Model',
      description: 'Behavior = Motivation x Ability x Prompt. Explains why people do or do not adopt behaviors.',
      tags: ['psychology', 'user engagement', 'triggers']
    },
    {
      id: 'hook',
      name: 'Hook Model (Nir Eyal)',
      description: 'Trigger -> Action -> Variable Reward -> Investment. Describes how products form habits.',
      tags: ['habit formation', 'product design', 'retention']
    },
    {
      id: 'customer_journey',
      name: 'Customer Journey Mapping',
      description: 'Visual representation of the user experience from initial contact to long-term relationship.',
      tags: ['UX', 'user experience', 'pathways']
    },
    {
      id: 'rfm',
      name: 'RFM (Recency, Frequency, Monetary) Model',
      description: 'Used for customer segmentation based on purchase behavior. Adaptable for app engagement.',
      tags: ['segmentation', 'engagement', 'CRM']
    },
    {
      id: 'lifestage',
      name: 'User Lifecycle Stages',
      description: 'Segment users by their stage: Acquisition, Activation, Retention, Referral, Revenue.',
      tags: ['segmentation', 'user lifecycle', 'product growth']
    },
    // Add more models as needed
  ];

  // Tabs for the main content area
  const tabs = [
    {
      id: 'models',
      label: 'Behavior Models Research',
      content: (
        <div className="content-grid">
          {behaviorModels.map(model => (
            <Card key={model.id} className="data-model-card">
              <h3>{model.name}</h3>
              <p>{model.description}</p>
              <div className="tags">
                {model.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      )
    },
    {
      id: 'segmentation',
      label: 'Segmentation Strategies',
      content: (
        <div>
          <p>This section will outline various segmentation strategies for Flow Tune users based on their behavior, demographics, and product usage.</p>
          <ul>
            <li>**Active Schedulers:** Users who frequently use the calendar and task features.</li>
            <li>**Task Prioritizers:** Users focused on task management, less on time-blocking.</li>
            <li>**Insight Seekers:** Users who engage with productivity insights.</li>
            <li>**New Users:** Users in their first week/month.</li>
            <li>**At-Risk Users:** Users showing signs of disengagement.</li>
          </ul>
          {/* Add more detailed segmentation criteria here */}
        </div>
      )
    },
    {
        id: 'notes',
        label: 'My Research Notes',
        content: (
            <div className="notes-area">
                <h4>General Notes on Data Behavior Models</h4>
                <textarea
                    value={researchNotes}
                    onChange={(e) => setResearchNotes(e.target.value)}
                    placeholder="Jot down research findings, links, and ideas here..."
                />
                <button className="button button-primary" onClick={() => alert("Notes Saved (locally or to backend)")}>Save Notes</button>

                <h4 style={{marginTop: 'var(--spacing-md)'}}>Segmentation Specific Notes</h4>
                <textarea
                    value={segmentationNotes}
                    onChange={(e) => setSegmentationNotes(e.target.value)}
                    placeholder="Document specific segmentation ideas, user groups, and criteria..."
                />
                <button className="button button-primary" onClick={() => alert("Segmentation Notes Saved")}>Save Segmentation Notes</button>
            </div>
        )
    }
  ];

  return (
    <section className="page-container">
      <div className="container">
        <h1 className="page-title">Data Behavior Models & User Segmentation</h1>

        <p className="intro-text" style={{textAlign: 'center', marginBottom: 'var(--spacing-lg)', maxWidth: '800px', margin: '0 auto var(--spacing-lg) auto', color: 'var(--color-text-medium)'}}>
            This page serves as a hub for researching and defining the behavioral models and user segmentation strategies that will inform Flow Tune's product development and personalization efforts.
        </p>

        <TabbedInterface tabs={tabs} />

        {/* You could add more sections here if needed, e.g., for data visualization */}
        {/* <section style={{marginTop: 'var(--spacing-xl)'}}>
            <h2 className="section-heading">Data Visualization Placeholder</h2>
            <Card>
                <p>Integrate charts or graphs here from actual user data if available.</p>
                <div style={{height: '300px', background: 'var(--color-background-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    [Chart Placeholder]
                </div>
            </Card>
        </section> */}
      </div>
    </section>
  );
};

export default DataBehaviorModelsPage;
