import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Paper, 
  ThemeProvider, 
  IconButton,
  Card,
  CardMedia,
  CircularProgress,
  Chip,
  AppBar,
  Toolbar,
  Link,
  Divider,
  Stack,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Menu,

} from '@mui/material';
import { 
  CloudUpload as CloudUploadIcon,
  CameraAlt as CameraIcon,
  Apple as AppleIcon,
  Refresh as RefreshIcon,
  GitHub as GitHubIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Email as EmailIcon,
  Info as InfoIcon,
  Language as LanguageIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import theme from './theme';


// Translation dictionary
const translations = {
  en: {
    appTitle: "Safou Check",
    tagline: "Identify plum quality with AI technology",
    headerTitle: "Plum Quality Classifier",
    headerDescription: "Take or upload a photo of a plum to classify it as good, unripe, spotted, cracked, bruised or rotten.",
    takePhoto: "Take Photo",
    uploadImage: "Upload Image",
    classifyFruit: "Classify Plum",
    processing: "Processing...",
    result: "Classification Result",
    confidence: "Confidence",
    detailedResults: "Detailed Results",
    quickLinks: "Quick Links",
    home: "Home",
    about: "About",
    help: "Help",
    isPlum: "Plum",
    connect: "Connect With Us",
    hackathon: "JCIA Hackathon 2025",
    rights: "All rights reserved.",
    aboutTitle: "About This Project",
    aboutText: "This application was developed for the International AI Day Hackathon held in Cameroon from April 22-24, 2025. The hackathon's theme is 'Artificial Intelligence and Economic Development: Innovating to Transform', focusing on innovative solutions to real-world problems.",
    hackathonObjective: "The central project of this hackathon involves automatic sorting of plums into six categories (good quality, unripe, spotted, cracked, bruised, and rotten) using advanced computer vision and deep learning techniques. Participants are challenged to design an artificial intelligence model achieving the highest possible accuracy for plum image classification.",
    dataset: "Dataset",
    datasetInfo: "The model was trained using the African Plums Dataset available on Kaggle."
  },
  fr: {
    appTitle: "Safou Check",
    tagline: "Identifier la qualité des prunes avec la technologie IA",
    headerTitle: "Classificateur de Qualité des Prunes",
    headerDescription: "Prenez ou téléchargez une photo d'une prune pour la classer comme bonne, non mûre, tachetée, fissurée, meurtrie ou pourrie.",
    takePhoto: "Prendre Photo",
    uploadImage: "Télécharger Image",
    classifyFruit: "Classifier la Prune",
    processing: "Traitement...",
    result: "Résultat de Classification",
    confidence: "Confiance",
    detailedResults: "Résultats Détaillés",
    quickLinks: "Liens Rapides",
    home: "Accueil",
    about: "À Propos",
    help: "Aide",
    isPlum: "Prune",
    connect: "Nous Contacter",
    hackathon: "Hackathon JCIA 2025",
    rights: "Tous droits réservés.",
    aboutTitle: "À Propos de ce Projet",
    aboutText: "Cette application a été développée pour le Hackathon de la Journée Internationale de l'Intelligence Artificielle organisée au Cameroun du 22 au 24 avril 2025. Le thème du hackathon est 'Intelligence Artificielle et Développement Économique : Innover pour transformer', mettant l'accent sur des solutions innovantes aux problèmes réels.",
    hackathonObjective: "Le projet central de ce hackathon repose sur le tri automatique des prunes en six catégories (de bonne qualité, non mûre, tachetée, fissurée, meurtrie et pourrie), à l'aide de techniques avancées de vision par ordinateur et d'apprentissage profond. Les participants devront concevoir un modèle d'intelligence artificielle atteignant la meilleure précision possible pour la classification des images des prunes.",
    dataset: "Ensemble de Données",
    datasetInfo: "Le modèle a été entraîné en utilisant l'ensemble de données African Plums Dataset disponible sur Kaggle."
  }
};

// Categories with translations
const categories = {
  en: [
    { key: 'good', label: 'GOOD' },
    { key: 'unripe', label: 'UNRIPE' },
    { key: 'spotted', label: 'SPOTTED' },
    { key: 'cracked', label: 'CRACKED' },
    { key: 'bruised', label: 'BRUISED' },
    { key: 'rotten', label: 'ROTTEN' }
  ],
  fr: [
    { key: 'good', label: 'BONNE QUALITÉ' },
    { key: 'unripe', label: 'NON MÛRE' },
    { key: 'spotted', label: 'TACHETÉE' },
    { key: 'cracked', label: 'FISSURÉE' },
    { key: 'bruised', label: 'MEURTRIE' },
    { key: 'rotten', label: 'POURRIE' }
  ]
};

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const [anchorEl, setAnchorEl] = useState(null);

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentYear = new Date().getFullYear();
  const t = translations[language];

  const handleOpenLangMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseLangMenu = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLang) => {
    setLanguage(newLang);
    handleCloseLangMenu();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null); // Clear previous results
    }
  };

  const captureImage = () => {
    // Check if the device has camera capabilities
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // For mobile devices, create a proper file input for camera
      if (/Mobi|Android/i.test(navigator.userAgent)) {
        const input = document.getElementById('image-input');
        input.setAttribute('capture', 'environment'); // Use rear camera if available
        input.click();
      } else {
        // For desktop, just use the file picker
        document.getElementById('image-input').click();
      }
    } else {
      // Fallback for devices without camera access
      document.getElementById('image-input').click();
    }
  };



  const uploadImage = () => {
    // Use a dedicated file upload input (without capture attribute)
    document.getElementById('file-input').click();
  };



const processImage = async () => {
  if (!selectedImage) return;
  
  setIsProcessing(true);
  
  try {
    // Create form data or use direct URL depending on your case
    let requestData;
    
    // Option 1: If you have a file upload
    if (selectedImage instanceof File) {
      const formData = new FormData();
      formData.append('image', selectedImage);
      
      // Send the image file to your API
      const response = await axios.post('/api/api/classify/', formData);
      requestData = formData;
    } 
    // Option 2: If you have an image URL
    else if (typeof selectedImage === 'string') {
      // Send the image URL to your API
      requestData = { image_url: selectedImage };
    }
    
    const response = await axios.post('/api/api/classify/', requestData, {
      headers: {
        'Content-Type': selectedImage instanceof File ? 'multipart/form-data' : 'application/json'
      }
    });
    
    // Process the response from your backend
    const data = response.data;
    
    // Transform the backend response to match your application's format
    const classifications = data.all_probabilities.map(item => ({
      category: item.class,
      confidence: item.probability
    }));
    
    // Set the results state
    setResult({
      isPlum: data.is_plum,
      mainCategory: data.top_class,
      confidence: Math.round(data.top_probability * 100),
      allResults: classifications
    });
  } catch (error) {
    console.error('Error processing image:', error);
    setUrlError(error.response?.data?.error || 'Failed to process image');
  } finally {
    setIsProcessing(false);
  }
};

  // New function to handle URL input change
  const handleUrlChange = (event) => {
    setImageUrl(event.target.value);
    setUrlError('');
  };
  
  const loadImageFromUrl = async () => {
    if (!imageUrl) {
      setUrlError(language === 'en' ? 'Please enter a URL' : 'Veuillez entrer une URL');
      return;
    }
  
    try {
      new URL(imageUrl);
    } catch (e) {
      setUrlError(language === 'en' ? 'Invalid URL format' : 'Format d\'URL invalide');
      return;
    }
  
    setLoading(true); // Start spinner
  
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error('Image fetch failed');
  
      const blob = await response.blob();
      const urlParts = imageUrl.split('/');
      const filename = urlParts[urlParts.length - 1] || 'downloaded-image';
      const file = new File([blob], filename, { type: blob.type });
  
      const previewUrl = URL.createObjectURL(blob);
      setPreview(previewUrl);
      setSelectedImage(file);
      setResult(null);
      setUrlDialogOpen(false);
      setImageUrl('');
      setUrlError(null);
    } catch (error) {
      setUrlError(language === 'en' ? 'Failed to load image from URL' : 'Échec du chargement de l\'image depuis l\'URL');
    } finally {
      setLoading(false); // Stop spinner
    }
  };
  
  

  const resetAll = () => {
    setSelectedImage(null);
    setPreview(null);
    setResult(null);
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'good': return theme.palette.success.main;
      case 'unripe': return theme.palette.primary.main;
      case 'spotted': return theme.palette.warning.main;
      case 'cracked': return theme.palette.secondary.main;  
      case 'bruised': return theme.palette.info.main;
      case 'rotten': return theme.palette.error.main;
      default: return theme.palette.text.primary;
    }
  };

  const getCategoryLabel = (category) => {
    const cat = categories[language].find(c => c.key === category);
    return cat ? cat.label : category.toUpperCase();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh', 
        bgcolor: 'background.default' 
      }}>
        <AppBar position="static" color="transparent" elevation={0}>
          <Toolbar>
            <AppleIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
              {t.appTitle}
            </Typography>
            
            <IconButton onClick={() => setAboutOpen(true)} color="inherit">
              <InfoIcon />
            </IconButton>
            
            <IconButton onClick={handleOpenLangMenu} color="inherit">
              <LanguageIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseLangMenu}
            >
              <MenuItem onClick={() => handleLanguageChange('en')} selected={language === 'en'}>
                English
              </MenuItem>
              <MenuItem onClick={() => handleLanguageChange('fr')} selected={language === 'fr'}>
                Français
              </MenuItem>
            </Menu>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="md" sx={{ mt: 4, mb: 8, flexGrow: 1 }}>
          <Paper elevation={0} sx={{ p: 4, borderRadius: 4, mb: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              {t.headerTitle}
            </Typography>
            <Typography variant="body1" align="center" color="text.secondary" paragraph>
              {t.headerDescription}
            </Typography>
            
            <Box 
              sx={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'center', 
                alignItems: 'center', 
                gap: 2,
                mt: 4 
              }}
            >
              <Button
                variant="contained"
                color="primary"
                startIcon={<CameraIcon />}
                onClick={captureImage}
                sx={{ width: isMobile ? '100%' : 'auto' }}
              >
                {t.takePhoto}

                <input
          id="image-input"
          type="file"
          accept="image/*"
          capture="environment"
          hidden
          onChange={handleImageUpload}
        />
              </Button>
              
              <Button
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                component="label"
                sx={{ width: isMobile ? '100%' : 'auto' }}
              >
                {t.uploadImage}
                <input

          id="file-input"
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />
              </Button>

              <Button
          variant="outlined"
          startIcon={<LanguageIcon />}
          onClick={() => setUrlDialogOpen(true)}
          sx={{ width: isMobile ? '100%' : 'auto' }}
        >
          {language === 'en' ? 'Load from URL' : 'Charger depuis URL'}
        </Button>

            </Box>
          </Paper>
          {loading && (
  <div style={{ display: 'flex', alignItems: 'center', marginTop: 16 }}>
    <CircularProgress size={24} />
    <span style={{ marginLeft: 12 }}>
      {language === 'en' ? 'Loading image...' : 'Chargement de l\'image...'}
    </span>
  </div>
)}


          {/* URL Input Dialog */}
      <Dialog open={urlDialogOpen} onClose={() => setUrlDialogOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          {language === 'en' ? 'Load image from URL' : 'Charger l\'image depuis URL'}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label={language === 'en' ? 'Image URL' : 'URL de l\'image'}
            type="url"
            fullWidth
            variant="outlined"
            value={imageUrl}
            onChange={handleUrlChange}
            error={!!urlError}
            helperText={urlError}
            placeholder="https://example.com/image.jpg"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setUrlDialogOpen(false)}>
            {language === 'en' ? 'Cancel' : 'Annuler'}
          </Button>
          <Button onClick={loadImageFromUrl} variant="contained" color="primary">
            {language === 'en' ? 'Load' : 'Charger'}
          </Button>
        </DialogActions>
      </Dialog>
          {preview && (
            <Card sx={{ mb: 4, borderRadius: 4, overflow: 'hidden' }}>
              <CardMedia
                component="img"
                height="300"
                image={preview}
                alt="Plum image"
                sx={{ objectFit: 'contain', bgcolor: '#f0f0f0' }}
              />
              
              <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                {/* <Typography variant="subtitle1" fontWeight={600}>
                  {selectedImage && selectedImage.name}
                </Typography> */}
                
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton size="small" onClick={resetAll}>
                    <RefreshIcon />
                  </IconButton>
                  
                  <Button 
                    variant="contained" 
                    disabled={isProcessing}
                    onClick={processImage}
                  >
                    {isProcessing ? (
                      <>

                        <CircularProgress size={20} sx={{ mr: 1, color: 'blue' }} />
                        {t.processing}
                      </>
                    ) : t.classifyFruit}
                  </Button>
                </Box>
              </Box>
            </Card>
          )}

          {console.log(result)}
          {result && (
            <Paper elevation={0} sx={{ p: 4, borderRadius: 4 }}>
              <Typography variant="h5" gutterBottom align="center">
                {t.result}
              </Typography>
              
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, mb: 4 }}>
                <Chip 
                  label={getCategoryLabel(result.mainCategory)} 
                  sx={{ 
                    fontSize: '1.2rem', 
                    py: 3, 
                    px: 4, 
                    bgcolor: getCategoryColor(result.mainCategory),
                    color: 'white'
                  }} 
                />
              </Box>

              <Typography 
  variant="subtitle1" 
  align="center" 
  gutterBottom 
  sx={{ 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: 1 
  }}
>
  {t.isPlum}: 
  {result.isPlum ? 
    <CheckCircleIcon 
      color="success" 
      sx={{ fontSize: 28, verticalAlign: 'middle'}} 
    /> : 
    <CancelIcon 
      color="error" 
      sx={{ fontSize: 28, verticalAlign: 'middle'}} 
    />
  }
</Typography>
             { result.isPlum && <Typography variant="subtitle1" align="center" gutterBottom>
                {t.confidence}: {result.confidence}%
              </Typography>}
              
              <Box sx={{ mt: 4 }}>
              { result.isPlum &&  <Typography variant="subtitle2" gutterBottom>
                  {t.detailedResults}:
                </Typography> }
                
                {result.isPlum && result.allResults.map((item) => (
                  <Box 
                    key={item.category}
                    sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      mb: 1,
                      p: 1.5,
                      borderRadius: 2,
                      bgcolor: `${getCategoryColor(item.category)}22`
                    }}
                  >
                    <Typography sx={{ textTransform: 'capitalize', fontWeight: 500 }}>
                      {getCategoryLabel(item.category)}
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>
                      {Math.round(item.confidence * 100)}%
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          )}
        </Container>
        
        {/* About Dialog */}
        <Dialog 
          open={aboutOpen} 
          onClose={() => setAboutOpen(false)}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">{t.aboutTitle}</Typography>
            <IconButton onClick={() => setAboutOpen(false)}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" color="primary" gutterBottom>
                {t.hackathon}
              </Typography>
              <Typography paragraph>
                {t.aboutText}
              </Typography>
              <Typography paragraph>
                {t.hackathonObjective}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="h6" color="primary" gutterBottom>
                {t.dataset}
              </Typography>
              <Typography paragraph>
                {t.datasetInfo}
              </Typography>
            </Box>
            
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {categories[language].map((category) => (
                <Grid item xs={6} sm={4} md={2} key={category.key}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1,
                      textAlign: 'center',
                      bgcolor: `${getCategoryColor(category.key)}22`,
                      borderRadius: 2
                    }}
                  >
                    <Typography variant="caption" sx={{ fontWeight: 600, color: getCategoryColor(category.key) }}>
                      {category.label}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setAboutOpen(false)} color="primary">
              {language === 'en' ? 'Close' : 'Fermer'}
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Enhanced Footer */}
        <Box 
          component="footer" 
          sx={{ 
            py: 5, 
            bgcolor: theme.palette.primary.dark,
            color: 'white',
            mt: 'auto'
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {t.appTitle}
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2, opacity: 0.8 }}>
                    {t.tagline}
                  </Typography>
                  <Chip 
                    label={t.hackathon} 
                    color="secondary" 
                    size="small" 
                    sx={{ fontWeight: 500 }} 
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h6" gutterBottom>
                  {t.quickLinks}
                </Typography>
                <Stack spacing={1.5}>
                  <Link 
                    href="#" 
                    color="inherit" 
                    underline="hover" 
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    {t.home}
                  </Link>
                  <Link 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      setAboutOpen(true);
                    }}
                    color="inherit" 
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    {t.about}
                  </Link>
                  <Link 
                    href="#" 
                    color="inherit" 
                    underline="hover"
                    sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                  >
                    {t.help}
                  </Link>
                </Stack>
              </Grid>
              
              <Grid item xs={12} sm={6} md={4}>
                <Typography variant="h6" gutterBottom>
                  {t.connect}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5, mt: 2 }}>
                  <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }} size="medium">
                    <GitHubIcon />
                  </IconButton>
                  <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }} size="medium">
                    <LinkedInIcon />
                  </IconButton>
                  <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }} size="medium">
                    <EmailIcon />
                  </IconButton>
                  <IconButton sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }} size="medium">
                    <InstagramIcon />
                  </IconButton>
                </Box>
                
                <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LanguageIcon fontSize="small" sx={{ opacity: 0.7 }} />
                  <Stack direction="row" spacing={1}>
                    <Link 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        handleLanguageChange('en');
                      }} 
                      color="inherit" 
                      underline={language === 'en' ? 'always' : 'hover'}
                      sx={{ fontWeight: language === 'en' ? 600 : 400 }}
                    >
                      English
                    </Link>
                    <Typography sx={{ opacity: 0.7 }}>|</Typography>
                    <Link 
                      href="#" 
                      onClick={(e) => {
                        e.preventDefault();
                        handleLanguageChange('fr');
                      }} 
                      color="inherit" 
                      underline={language === 'fr' ? 'always' : 'hover'}
                      sx={{ fontWeight: language === 'fr' ? 600 : 400 }}
                    >
                      Français
                    </Link>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                © {currentYear} {t.appTitle}. {t.rights}
              </Typography>
              
              <Typography variant="caption" sx={{ opacity: 0.7 }}>
                {language === 'en' ? 'Developed for JCIA Hackathon 2025' : 'Développé pour le Hackathon JCIA 2025'}
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;