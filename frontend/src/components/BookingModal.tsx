import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { BookingSchema } from "../schemas/BookingShema";
import { useCreateBookingMutation } from "../services/bookingAPI";
import toast from "react-hot-toast";

interface BookingModalProps {
  open: boolean;
  onClose: () => void;
}

function BookingModal({ open, onClose }: BookingModalProps) {
  const [createBooking] = useCreateBookingMutation();

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90%", sm: 400 },
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" mb={3}>
          Create New Booking
        </Typography>
        <Formik
          initialValues={{
            title: "",
          }}
          validationSchema={BookingSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              const data = {
                title: values.title,
              };
              await createBooking(data).unwrap();
              toast.success("Booking created successfully");
              onClose();
            } catch (err) {
              if (err instanceof Error) {
                toast.error("Booking creation failed");
                console.error(`Booking creation failed: ${err.message}`);
              } else {
                toast.error("Booking creation failed");
                console.error("Booking creation failed");
              }
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ errors, touched, status, isSubmitting }) => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                label="Title"
                name="title"
                size="small"
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
                margin="normal"
              />

              {status?.error && (
                <Typography color="error" sx={{ mt: 2 }}>
                  {status.error}
                </Typography>
              )}
              <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  type="submit"
                  size="small"
                  fullWidth
                  disabled={isSubmitting}
                >
                  Create Booking
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={onClose}
                  fullWidth
                >
                  Cancel
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </Modal>
  );
}

export default BookingModal;
