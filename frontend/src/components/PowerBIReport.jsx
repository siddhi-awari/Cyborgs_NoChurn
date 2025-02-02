import React, { useRef } from 'react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

function PowerBIReport() {
   
    const embedRef = useRef(null);

    const handleExportPDF = async () => {
        if (!embedRef.current) {
            console.error("No embedded report found.");
            return;
        }

        try { 
            const report = embedRef.current;
            const exportResult = await report.export(models.ExportDataType.PDF);
            const blob = new Blob([exportResult.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.href = url;
            a.download = 'report.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Export to PDF failed:', error);
        }
    };

    const embedConfig = {
        type: 'report',
        id: '<REPORT_ID>',
        embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=<REPORT_ID>&groupId=<WORKSPACE_ID>',
        accessToken: '<YOUR_EMBED_TOKEN>',
        tokenType: models.TokenType.Embed,
        settings: {}
    };

    return (
        <div>
            <button onClick={handleExportPDF}>
                Export to PDF
            </button>

            <PowerBIEmbed
                embedConfig={embedConfig}
                getEmbeddedComponent={(embeddedReport) => {
                    embedRef.current = embeddedReport;
                }}
            />
        </div>
    );
}

export default PowerBIReport;
