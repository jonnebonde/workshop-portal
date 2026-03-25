import React, { useMemo, useState } from 'react';
import { Newspaper, ExternalLink, X, Download, Check } from 'lucide-react';

interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  publishedAt: string;
  category: 'platform' | 'workshop' | 'update' | 'announcement';
  isImportant?: boolean;
  externalLink?: string;
  imageUrl?: string;
  attachments?: Array<{ name: string; url: string }>;
}

const mockNews: NewsItem[] = [
  {
    id: '1',
    title: 'New Invoice Review System Released',
    summary: 'We have launched an improved invoice review system with automated OCR processing.',
    content: 'The new invoice review system includes automated OCR processing, faster approval workflows, and enhanced error detection. This will significantly reduce the time needed for invoice processing and improve accuracy.',
    publishedAt: '2024-01-15T10:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    attachments: [
      { name: 'Release-notes.pdf', url: 'https://example.com/release-notes.pdf' }
    ]
  },
  {
    id: '2',
    title: 'Workshop Integration Updates',
    summary: 'Enhanced integration with workshop management systems for better case tracking.',
    content: 'We have improved our integration capabilities with various workshop management systems. This includes better real-time synchronization, enhanced data mapping, and improved error handling.',
    publishedAt: '2024-01-12T14:30:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
    attachments: [
      { name: 'Integration-guide.pdf', url: 'https://example.com/integration-guide.pdf' }
    ]
  },
  {
    id: '3',
    title: 'Scheduled Maintenance - January 20th',
    summary: 'System maintenance scheduled for January 20th from 02:00 to 04:00 CET.',
    content: 'We will be performing scheduled maintenance on January 20th from 02:00 to 04:00 CET. During this time, the system may be temporarily unavailable. We apologize for any inconvenience.',
    publishedAt: '2024-01-10T09:00:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    attachments: [
      { name: 'Maintenance-window.pdf', url: 'https://example.com/maintenance-window.pdf' }
    ]
  },
  {
    id: '4',
    title: 'New KPI Dashboard Features',
    summary: 'Added new analytics and reporting features to the KPI dashboard.',
    content: 'The KPI dashboard now includes advanced filtering options, custom date ranges, and exportable reports. These features will help workshop managers get better insights into their operations.',
    publishedAt: '2024-01-08T11:15:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    attachments: [
      { name: 'KPI-dashboard.pdf', url: 'https://example.com/kpi-dashboard.pdf' }
    ]
  },
  {
    id: '5',
    title: 'Mobile App Beta Testing',
    summary: 'Join our beta testing program for the new mobile application.',
    content: 'We are looking for workshop partners to participate in beta testing of our new mobile application. The app will allow technicians to update case status, upload images, and communicate directly from their mobile devices.',
    publishedAt: '2024-01-05T16:45:00Z',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    attachments: [
      { name: 'Beta-program.pdf', url: 'https://example.com/beta-program.pdf' }
    ],
   
  }
];

const NewsPage: React.FC = () => {
  const [selectedNewsId, setSelectedNewsId] = useState<string | null>(null);
  const [confirmedRead, setConfirmedRead] = useState<Record<string, boolean>>({});

  const selectedNews = useMemo(
    () => mockNews.find((item) => item.id === selectedNewsId) || null,
    [selectedNewsId]
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('nb-NO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-8 px-6 py-6 bg-background max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
       
        <h1 className="text-3xl font-bold text-brand-dark">News</h1>
        <p className="text-gray-700 max-w-3xl">Latest updates and announcements related to the platform and workshop operations</p>
      </div>

      {/* News List */}
      <div className="space-y-6">
        {mockNews.map((newsItem) => (
          <article
            key={newsItem.id}
            className="border-blue-500 bg-white shadow-sm hover:shadow-md p-4 rounded-lg" >
            <div className="mb-4 flex items-stretch justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h2 className="text-xl font-semibold text-brand-dark">
                    {newsItem.title}
                  </h2>
                  {!confirmedRead[newsItem.id] && (
                    <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                     New message
                    </span>
                  )}
                  {confirmedRead[newsItem.id] && (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      
                    </span>
                  )}
                </div>

                <div className="flex items-center space-x-4 text-sm text-gray-600 ">
                  <div className="flex items-center">
                    Published: {formatDate(newsItem.publishedAt)}
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 items-end">
                <button
                  type="button"
                  onClick={() => setSelectedNewsId(newsItem.id)}
                  className="rounded-md bg-brand-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                  View
                </button>
              </div>
            </div>

          
          </article>
        ))}
      </div>

      {/* Empty State (if no news) */}
      {mockNews.length === 0 && (
        <div className="text-center py-12">
          <Newspaper className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-brand-dark mb-2">No news available</h3>
          <p className="text-gray-500">Check back later for updates and announcements.</p>
        </div>
      )}

      {selectedNews && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="relative flex w-full max-w-2xl max-h-[85vh] min-h-0 flex-col overflow-hidden rounded-lg bg-white shadow-xl">
            <button
              type="button"
              onClick={() => setSelectedNewsId(null)}
              className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="min-h-0 flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold text-brand-dark">{selectedNews.title}</h3>
                  
                  </div>
                  <p className="text-xs text-gray-500">Published: {formatDate(selectedNews.publishedAt)}</p>
                </div>

        
                <p className="text-gray-900 leading-relaxed">{selectedNews.content}</p>

                {selectedNews.imageUrl && (
                  <div className="overflow-hidden rounded-xl border border-gray-200">
                    <img
                      src={selectedNews.imageUrl}
                      alt=""
                      className="h-64 w-full object-cover"
                    />
                  </div>
                )}

                {selectedNews.attachments && selectedNews.attachments.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-sm font-semibold text-brand-dark">Attachments</div>
                    <div className="space-y-2">
                      {selectedNews.attachments.map((attachment) => (
                        <div
                          key={attachment.url}
                          className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2"
                        >
                          <span className="text-sm text-gray-700">{attachment.name}</span>
                          <a
                            href={attachment.url}
                            className="inline-flex items-center rounded-md bg-brand-primary px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                          >
                            Download
                            <Download className="ml-2 h-3.5 w-3.5" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 flex items-center justify-end  pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setConfirmedRead((prev) => ({ ...prev, [selectedNews.id]: true }));
                    }}
                    disabled={confirmedRead[selectedNews.id]}
                    className={`inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold text-white ${
                      confirmedRead[selectedNews.id]
                        ? 'cursor-not-allowed bg-gray-300 hidden'
                        : 'bg-brand-primary hover:opacity-90'
                    }`}
                  >
                    {confirmedRead[selectedNews.id] ? 'Confirmed' : 'Confirm read'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
