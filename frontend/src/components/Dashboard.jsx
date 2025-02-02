import React, { useRef } from 'react';
import '../styles/Dashboard.css';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Dashboard = () => {
    const exportRef = useRef(null);


    const handleExportPDF = async () => {
        try {
           
            const element = exportRef.current;
            const canvas = await html2canvas(element);

            const pdf = new jsPDF('p', 'pt', 'a4'); 
            const imgData = canvas.toDataURL('image/png');

            const pdfWidth = pdf.internal.pageSize.getWidth();   
            const pdfHeight = pdf.internal.pageSize.getHeight(); 

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, 0);
            pdf.save('dashboard.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    const powerBIUrl = "https://app.powerbi.com/reportEmbed?reportId=473fa9f3-7002-4b13-84fa-2311f3e0b06f&autoAuth=true&ctid=cca3f0fe-586f-4426-a8bd-b8146307e738"; // Publish to web URL

    return (
        <div ref={exportRef}>
            <iframe
                src={powerBIUrl}
                frameBorder="0"
                title="Power BI Embed"
                className="powerbi-iframe"
            />

            <h2>Analysis</h2>
            <div className="card-container">
                <div className="card">
                    <h2>Demographic and Churn Profile Analysis</h2>
                    <ul>
                        <li><strong>Seniority Effect on Churn:</strong> Senior citizens have higher churn rates, indicating a need for tailored engagement.</li>
                        <li><strong>Marital Status & Dependents:</strong> Unmarried and childless customers churn more, highlighting engagement gaps.</li>
                        <li><strong>Gender Neutrality:</strong> Churn is balanced across genders; focus on other factors like contract types.</li>
                    </ul>
                </div>

                <div className="card">
                    <h2>Internet Service Analysis</h2>
                    <ul>
                        <li><strong>Fiber Optic High Risk:</strong> Fiber optic churn (0.42) exceeds DSL (0.19), pointing to reliability or pricing issues.</li>
                        <li><strong>Impact of Monthly Charges:</strong> Churn spikes at $70–$90, especially for Fiber Optic users.</li>
                        <li><strong>Technical Support Correlation:</strong> Fiber optic users have more support tickets (7%) vs. DSL (4.89%).</li>
                    </ul>
                </div> 

                <div className="card">
                    <h2>Contract and Billing Insights</h2>
                    <ul>
                        <li><strong>Month-to-Month Churn:</strong> Most churned customers use month-to-month plans, indicating low commitment.</li>
                        <li><strong>Payment Methods Matter:</strong> Electronic check users show the highest churn, suggesting dissatisfaction.</li>
                        <li><strong>Paperless Billing:</strong> Users on paperless billing churn less, suggesting streamlined processes help retention.</li>
                    </ul>
                </div>

                <div className="card">
                    <h2>Additional Services Analysis</h2>
                    <ul>
                        <li><strong>Tech Support & Security:</strong> Subscribers show lower churn, indicating these add-ons boost loyalty.</li>
                        <li><strong>Bundled Services:</strong> Multiple add-ons correlate with the lowest churn rates.</li>
                        <li><strong>Minimal Service Users:</strong> Higher churn among those with no additional services.</li>
                    </ul>
                </div>

                <div className="card">
                    <h2>Key Relationships and Advanced Predictions</h2>
                    <ul>
                        <li><strong>Churn & Tech Tickets:</strong> More tech support tickets correlate with higher churn.</li>
                        <li><strong>Monthly Charges & Behavior:</strong> Higher charges drive higher churn, pointing to pricing concerns.</li>
                        <li><strong>DSL Interventions:</strong> DSL users risk rising dissatisfaction with higher charges, requiring proactive measures.</li>
                    </ul>
                </div>
            </div>

            <h2>Recommendations</h2>
            <div className="card-container">
                <div className="card">
                    <h2>Personalized Retention Strategies</h2>
                    <ul>
                        <li><strong>Solution:</strong> Develop customer personas based on key churn factors like seniority, contract type, and payment method.</li>
                        <li>Engage at-risk customers with targeted communication, loyalty rewards, and exclusive benefits.</li>
                        <li><strong>Case Study – Pret A Manger:</strong> Subscription loyalty program led to 20% revenue growth and a 44% save rate for cancellations.</li>
                    </ul>
                </div>

                <div className="card">
                    <h2>Improve Service for High-Risk Fiber Optic Users</h2>
                    <ul>
                        <li><strong>Solution:</strong> Enhance network reliability and provide proactive customer support.</li>
                        <li>Offer affordable entry-level fiber packages.</li>
                        <li><strong>Case Study – Cafeyn:</strong> Subscription management optimizations reduced involuntary churn by 90%.</li>
                    </ul>
                </div>

    

                <div className="card">
                    <h2>Mitigate Churn in Month-to-Month Contracts</h2>
                    <ul>
                        <li><strong>Solution:</strong> Incentivize annual subscriptions with perks and offer subscription pause options.</li>
                        <li><strong>Case Study – Chargebee:</strong> Pause feature saved 44% of customers initiating cancellations.</li>
                    </ul>
                </div>

                <div className="card">
                    <h2>Payment Flexibility Reduces Churn</h2>
                    <ul>
                        <li><strong>Solution:</strong> Introduce auto-payments, digital wallets, and proactive reminders.</li>
                        <li><strong>Case Study – Jane:</strong> Automated billing improved retention rates from 10% to 16%.</li>
                    </ul>
                </div>

                <div className="card">
                    <h2>Retain Customers with Additional Services</h2>
                    <ul>
                        <li><strong>Solution:</strong> Upsell high-value add-ons and create bundled packages.</li>
                        <li><strong>Case Study – Amazon Prime & Apple One:</strong> Bundling services increased long-term retention and customer lifetime value.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
