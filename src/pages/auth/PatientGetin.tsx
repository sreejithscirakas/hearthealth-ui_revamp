import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid2";
import precisionHeartIcon from "../../assets/favicon.png";

const genders = ["Male", "Female", "Other", "Prefer not to say"];

export default function PatientGetin() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: null,
    age: "",
    gender: "",
    email: "",
    phone: "",
    story: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field: string) => (event: any) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
    if (errors[field as keyof typeof errors]) {
      setErrors({
        ...errors,
        [field]: "",
      });
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
    navigate("/dashboard");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ecf9fc",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          left: -100,
          top: -100,
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: 'linear-gradient(135deg,rgba(255, 15, 123, 1) 0%, rgba(255, 255, 255, 1) 100%)',
          opacity: 0.2,
        }}
      ></Box>
      <Box
        sx={{
          position: "absolute",
          right: -100,
          bottom: -100,
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: 'linear-gradient(135deg,rgba(255, 255, 255, 1) 0%, rgba(255, 15, 123, 1) 100%)',
          opacity: 0.1,
        }}
      ></Box>
      {!isMobile && (
        <a href="https://hearthealth.ahimsa.global/" style={{ textDecoration: 'none' }}>
        <Box
          sx={{
            position: "absolute",
            left: 50,
            top: 50,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              component="img"
              src={precisionHeartIcon}
              alt="Logo"
              sx={{ width: 40, height: 40, mr: 1 }}
            ></Box>
            <Typography
              variant="h5"
              sx={{
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              Precision-Heart
            </Typography>
          </Box>
        </Box>
        </a>
      )}
      <Container maxWidth="md"
      sx={{
        border: '1px solid rgba(0, 0, 0, 0.12)',
        margin: '0 auto',
        padding: '48px',
        borderRadius: '8px',
        backgroundColor: '#FFFFFF'
      }}>
        {isMobile && (
          <a href="https://hearthealth.ahimsa.global/" style={{ textDecoration: 'none' }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 4,
              mt: 4,
            }}
          >
            <Box
              component="img"
              src={precisionHeartIcon}
              alt="Logo"
              sx={{ width: 40, height: 40, mr: 1 }}
            ></Box>
            <Typography
              variant="h5"
              sx={{
                color: "primary.main",
                fontWeight: 600,
              }}
            >
              Precision-Heart
            </Typography>
          </Box>
          </a>
        )}
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            color: "#2d3748",
            fontWeight: "600",
            fontSize: isMobile ? "18px" : "30px",
          }}
        >
          Please fill your basic info
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="First Name"
                required
                value={formData.firstName}
                onChange={handleChange("firstName")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={handleChange("lastName")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap={2}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="DOB"
                    value={formData.dob}
                    onChange={(newValue) =>
                      handleChange("dob")({ target: { value: newValue } })
                    }
                    sx={{ width: "100%" }}
                  />
                </LocalizationProvider>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: "bold", color: "primary.main" }}
                >
                  OR
                </Typography>

                <TextField
                  fullWidth
                  label="Age"
                  value={formData.age}
                  onChange={handleChange("age")}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={formData.gender}
                  label="Gender"
                  onChange={handleChange("gender")}
                >
                  {genders.map((gender) => (
                    <MenuItem key={gender} value={gender}>
                      {gender}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Email"
                required
                type="email"
                value={formData.email}
                onChange={handleChange("email")}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone}
                onChange={handleChange("phone")}
                helperText="Format: +1234567890"
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Questions / Story"
                multiline
                rows={4}
                value={formData.story}
                onChange={handleChange("story")}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Button
                type="submit"
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: "primary.main",
                }}
              >
                Submit
              </Button>
              <Button
                type="submit"
                variant="outlined"
                sx={{
                  mt: 2,
                  ml: 2,
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
