import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  Typography,
  TableBody,
  TableCell,
  TableRow,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Flight,
  CloudUpload,
  Description,
  UploadFile,
  Add
} from '@mui/icons-material';
import { fetchDashboardData, updateRequestStatus } from '../../redux/slices/dashboardSlice';
import { logout } from '../../features/authSlice';
import BaseLayout from '../../components/layout/BaseLayout';
import {
  SharedCard,
  SharedTypography,
  StatusChip,
  LoadingSpinner,
  UserAvatar,
  Navbar,
  SharedModal,
  SharedButton,
  SharedTable,
  TableHeader
} from '../../components/shared';
import { AnimatedPage, AnimatedList, AnimatedListItem } from '../../animations/components';
import { theme as customTheme } from '../../config/theme';

const DashboardEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { user } = useSelector((state) => state.auth);
  const { activeRequest, loading } = useSelector((state) => state.dashboard);

  // Modals state
  const [showDocumentsListModal, setShowDocumentsListModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [documents, setDocuments] = useState([]);
  const [activeDoc, setActiveDoc] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  useEffect(() => {
    if (activeRequest?.documents) {
      setDocuments(activeRequest.documents);
    }
  }, [activeRequest]);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/login', { replace: true });
  };

  // --- Upload Logic ---

  const openUploadModal = (doc) => {
    setActiveDoc(doc);
    setShowUploadModal(true);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && activeDoc) {
      processFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && activeDoc) {
      processFile(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const processFile = (file) => {
    // Update local state
    setDocuments(prev => prev.map(d =>
      d.id === activeDoc.id ? { ...d, status: 'UPLOADED', fileName: file.name } : d
    ));

    // Close upload modal
    setShowUploadModal(false);
    setActiveDoc(null);
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmitAll = () => {
    if (activeRequest) {
      dispatch(updateRequestStatus({
        id: activeRequest.id,
        status: 'UNDER_REVIEW',
        stepIndex: 2
      }));
    }
    setShowDocumentsListModal(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <BaseLayout variant="dashboard">
      <Navbar user={user} onLogout={handleLogout} />

      <AnimatedPage className="p-4 mt-4">
        <Box sx={{ p: { xs: 2, md: 3 }, mt: 2 }}>
          {/* Header */}
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
            <UserAvatar
              firstName={user?.firstName}
              lastName={user?.lastName}
              size="large"
            />
            <Box>
              <SharedTypography variant="pageTitle">
                Employee Dashboard
              </SharedTypography>
              <StatusChip
                label={user?.role}
                variant="default"
              />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <SharedButton
              variant="primary"
              startIcon={<Add />}
              onClick={() => navigate('/create-request')}
              sx={{
                bgcolor: customTheme.primary[600],
                '&:hover': { bgcolor: customTheme.primary[700] },
                boxShadow: customTheme.shadows.lg
              }}
            >
              Raise Travel Request
            </SharedButton>
          </Box>

          {/* Active Application Card */}
          <AnimatedList>
            {activeRequest ? (
              <AnimatedListItem>
                <SharedCard variant="dashboard" sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: customTheme.neutral[900] }}>
                        Your Active Travel Application
                      </Typography>
                      <Typography variant="body2" sx={{ color: customTheme.neutral[500] }}>
                        {activeRequest.id} • {activeRequest.destination}
                      </Typography>
                    </Box>
                    <StatusChip label={activeRequest.status} />
                  </Box>

                  {/* Stepper */}
                  <Box sx={{ width: '100%', mb: 4 }}>
                    <Stepper activeStep={activeRequest.status === 'UNDER_REVIEW' ? 2 : 1} alternativeLabel orientation={isMobile ? 'vertical' : 'horizontal'}>
                      {activeRequest.steps.map((step) => (
                        <Step key={step.label} completed={step.completed}>
                          <StepLabel>{step.label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>

                  {/* Action Button */}
                  <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <SharedButton
                      variant="primary"
                      startIcon={<CloudUpload />}
                      onClick={() => setShowDocumentsListModal(true)}
                      disabled={activeRequest.status !== 'AWAITING_DOCUMENTS'}
                      size="lg"
                    >
                      {activeRequest.status === 'AWAITING_DOCUMENTS' ? 'Upload Required Documents' : 'Documents Submitted'}
                    </SharedButton>
                  </Box>
                </SharedCard>
              </AnimatedListItem>
            ) : (
              <AnimatedListItem>
                <SharedCard>
                  <Box sx={{ p: 4, textAlign: 'center' }}>
                    <Flight sx={{ fontSize: 48, color: customTheme.neutral[300], mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">No active travel applications.</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Ready to plan your next trip?
                    </Typography>
                    <SharedButton
                      variant="outline"
                      onClick={() => navigate('/create-request')}
                    >
                      Start New Request
                    </SharedButton>
                  </Box>
                </SharedCard>
              </AnimatedListItem>
            )}
          </AnimatedList>
        </Box>

        {/* 1. Documents List Modal */}
        <SharedModal
          open={showDocumentsListModal}
          onClose={() => setShowDocumentsListModal(false)}
          title={`Required Documents for ${activeRequest?.id}`}
          width={800}
        >
          <Box sx={{ overflowX: 'auto' }}>
            <SharedTable>
              <TableHeader
                columns={[
                  { id: 'name', label: 'Document Name' },
                  { id: 'status', label: 'Status' },
                  { id: 'action', label: 'Action', align: 'center' }
                ]}
              />
              <TableBody>
                {documents.map((doc) => (
                  <TableRow key={doc.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Description color="action" fontSize="small" />
                        <Box>
                          <Typography variant="body2" fontWeight={500}>{doc.name}</Typography>
                          {doc.fileName && (
                            <Typography variant="caption" color="text.secondary">
                              {doc.fileName}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <StatusChip
                        label={doc.status}
                        color={doc.status === 'UPLOADED' ? 'success' : 'warning'}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {doc.status === 'PENDING' ? (
                        <SharedButton
                          variant="outline"
                          size="sm"
                          startIcon={<CloudUpload />}
                          onClick={() => openUploadModal(doc)}
                        >
                          Upload
                        </SharedButton>
                      ) : (
                        <SharedButton
                          variant="ghost"
                          size="sm"
                          onClick={() => openUploadModal(doc)}
                        >
                          Re-upload
                        </SharedButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </SharedTable>
          </Box>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <SharedButton
              variant="primary"
              onClick={handleSubmitAll}
              disabled={documents.some(d => d.status === 'PENDING')}
              size="lg"
            >
              Submit All Documents
            </SharedButton>
          </Box>
        </SharedModal>

        {/* 2. Drag & Drop Upload Modal */}
        <SharedModal
          open={showUploadModal}
          onClose={() => setShowUploadModal(false)}
          title={activeDoc ? `Upload ${activeDoc.name}` : 'Upload Document'}
          width={500}
        >
          <Box
            sx={{
              border: `2px dashed ${customTheme.neutral[300]}`,
              borderRadius: customTheme.borderRadius.lg,
              p: 6,
              textAlign: 'center',
              cursor: 'pointer',
              bgcolor: customTheme.neutral[50],
              transition: 'all 0.2s',
              '&:hover': {
                borderColor: customTheme.primary[500],
                bgcolor: customTheme.primary[50],
                transform: 'scale(1.01)'
              }
            }}
            onClick={triggerFileInput}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileSelect}
            />

            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ p: 2, bgcolor: customTheme.primary[100], borderRadius: '50%', color: customTheme.primary[600] }}>
                <UploadFile fontSize="large" />
              </Box>
            </Box>

            <Typography variant="h6" sx={{ mb: 1, color: customTheme.neutral[900], fontWeight: 600 }}>
              Click or Drag file to upload
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Supported formats: PDF, JPG, PNG (Max 5MB)
            </Typography>
          </Box>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <SharedButton
              variant="ghost"
              onClick={() => setShowUploadModal(false)}
            >
              Cancel
            </SharedButton>
          </Box>
        </SharedModal>
      </AnimatedPage>
    </BaseLayout>
  );
};

export default DashboardEmployee;
