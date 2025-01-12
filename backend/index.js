const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const admin = require("firebase-admin");

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection URI
const uri =
  "mongodb+srv://qwerty4884n:4pFVZttYFRxvs56F@cluster0.28pgw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(uri, {
    useNewUrlParser: true, // Parse the URL properly
    useUnifiedTopology: true, // Use the new unified topology layer
    serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds if unable to connect
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Create a MongoClient with Stable API options
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

admin.initializeApp({
  credential: admin.credential.cert(require("./serviceAccountKey.json")), // Path to your service account key file
  databaseURL: "https://hospital-food-management.firebaseio.com", // Firebase Realtime Database URL (adjust if using Firestore)
});

const fetchUserRole = async (userId) => {
  try {
    // Get reference to the 'users' collection and the document with userId
    const userRef = admin.firestore().collection("users").doc(userId);

    // Fetch the user document
    const userDoc = await userRef.get();

    // Check if the user document exists
    if (!userDoc.exists) {
      throw new Error("User not found");
    }

    // Get the role from the document
    const userData = userDoc.data();
    return userData.role; // Assuming 'role' is the field in the document
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw new Error("Failed to fetch user role");
  }
};

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();

    // Access the HospitalDB database and collections
    const db = client.db("HospitalDB");

    const patientCollection = db.collection("patients");
    const dietChartCollection = db.collection("dietCharts");
    const deliveryCollection = db.collection("deliveries");
    const pantryStaffCollection = db.collection("pantryStaff");
    const deliveryPersonnelCollection = db.collection("deliveryPersonnel");
    const mealCollection = db.collection("meals");

    // Routes
    // Default route

    app.get("/api/users/:userId/role", async (req, res) => {
      const { userId } = req.params;
      try {
        const role = await fetchUserRole(userId); // Fetch the role from Firestore
        res.json({ role }); // Respond with the user's role
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message }); // Return error message if something goes wrong
      }
    });

    app.get("/", (req, res) => {
      res.send("Welcome to Hospital API!");
    });

    // CRUD Operations for Patients
    app.post("/patients", async (req, res) => {
      const patient = req.body;
      try {
        const result = await patientCollection.insertOne(patient);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: "Failed to insert patient data" });
      }
    });

    app.get("/patients", async (req, res) => {
      try {
        const patients = await patientCollection.find().toArray();
        res.status(200).json(patients);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch patients" });
      }
    });

    app.get("/patients/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const patient = await patientCollection.findOne({
          _id: new ObjectId(id),
        });
        patient
          ? res.status(200).json(patient)
          : res.status(404).json({ error: "Patient not found" });
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch patient" });
      }
    });

    app.patch("/patients/:id", async (req, res) => {
      const id = req.params.id;
      const updatePatientData = req.body;

      // Ensure the provided ID is valid
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid patient ID" });
      }

      // Remove `_id` if it exists in the request body
      if (updatePatientData._id) {
        delete updatePatientData._id;
      }

      const filter = { _id: new ObjectId(id) }; // Find patient by ID
      const updateDoc = {
        $set: {
          ...updatePatientData, // Update the provided fields
        },
      };
      const options = { upsert: false }; // Do not create a new document

      try {
        // Update the patient details
        const result = await db
          .collection("patients")
          .updateOne(filter, updateDoc, options);

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Patient not found" });
        }

        res.json({ message: "Patient details updated successfully", result });
      } catch (error) {
        console.error("Error updating patient details:", error);
        res.status(500).json({ error: "Failed to update patient details" });
      }
    });

    app.delete("/patients/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };

      try {
        const result = await patientCollection.deleteOne(filter); // Use the correct collection for patients
        if (result.deletedCount === 0) {
          return res.status(404).send({ message: "Patient not found" });
        }
        res.send({ message: "Patient deleted successfully" });
      } catch (error) {
        console.error("Error deleting patient:", error);
        res.status(500).send({ message: "Failed to delete patient" });
      }
    });

    // CRUD Operations for Diet Charts
    app.post("/dietCharts", async (req, res) => {
      const dietChart = req.body;
      try {
        const result = await dietChartCollection.insertOne(dietChart);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: "Failed to insert diet chart" });
      }
    });

    app.get("/dietCharts", async (req, res) => {
      try {
        const dietCharts = await dietChartCollection.find().toArray();
        res.status(200).json(dietCharts);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch diet charts" });
      }
    });

    app.get("/dietChart/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const dietChart = await dietChartCollection.findOne({
          _id: new ObjectId(id),
        });
        dietChart
          ? res.status(200).json(dietChart)
          : res.status(404).json({ error: "Diet Chart not found" });
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch diet chart" });
      }
    });

    app.patch("/dietChart/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      try {
        const result = await dietChartCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );
        result.modifiedCount > 0
          ? res.status(200).json({ message: "Diet Chart updated successfully" })
          : res.status(404).json({ error: "Diet Chart not found" });
      } catch (error) {
        res.status(500).json({ error: "Failed to update diet chart" });
      }
    });

    app.delete("/dietChart/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const result = await dietChartCollection.deleteOne({
          _id: new ObjectId(id),
        });
        result.deletedCount > 0
          ? res.status(200).json({ message: "Diet Chart deleted successfully" })
          : res.status(404).json({ error: "Diet Chart not found" });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete diet chart" });
      }
    });

    // CRUD Operations for Deliveries
    app.post("/deliveries", async (req, res) => {
      const delivery = req.body; // Directly using the request body
      try {
        const result = await deliveryCollection.insertOne(delivery); // Assuming `deliveryCollection` is the database collection
        res
          .status(201)
          .json({ message: "Delivery task saved successfully!", result });
      } catch (error) {
        console.error("Error saving delivery task:", error);
        res.status(500).json({ error: "Failed to save delivery task." });
      }
    });

    app.get("/deliveries", async (req, res) => {
      try {
        const deliveries = await deliveryCollection.find().toArray();
        res.status(200).json(deliveries);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch deliveries" });
      }
    });

    app.get("/deliveries/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const delivery = await deliveryCollection.findOne({
          _id: new ObjectId(id),
        });
        delivery
          ? res.status(200).json(delivery)
          : res.status(404).json({ error: "Delivery not found" });
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch delivery" });
      }
    });

    app.patch("/deliveries/:id/status", async (req, res) => {
      const id = req.params.id;
      const { status, note } = req.body; // Expecting the new status and note in the request body

      // Validate the status value before updating
      const allowedStatuses = ["Assigned", "Picked Up", "Delivered"];
      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          error: `Invalid status value. Allowed values are: ${allowedStatuses.join(
            ", "
          )}.`,
        });
      }

      // Ensure the ID is valid
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid delivery ID" });
      }

      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status, // Update the status field
        },
      };

      // If the status is 'Delivered', we will add a note and timestamp
      if (status === "Delivered" && note) {
        updateDoc.$push = {
          // Push the note and timestamp to the notes array
          notes: {
            note: note,
            timestamp: new Date(),
          },
        };
      } else {
        // Handle case where note is missing or status is not 'Delivered'
        console.log("Note is required or the status is not Delivered.");
      }

      const options = { upsert: false }; // Do not insert a new document if no match is found

      try {
        // Update the delivery status in the database
        const result = await deliveryCollection.updateOne(
          filter,
          updateDoc,
          options
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Delivery not found" });
        }

        res.json({ message: "Delivery status updated", result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update delivery status" });
      }
    });

    app.delete("/deliveries/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const result = await deliveryCollection.deleteOne({
          _id: new ObjectId(id),
        });
        result.deletedCount > 0
          ? res.status(200).json({ message: "Delivery deleted successfully" })
          : res.status(404).json({ error: "Delivery not found" });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete delivery" });
      }
    });

    // CRUD Operations for Pantry Staff
    app.post("/pantryStaff", async (req, res) => {
      const staff = req.body;
      try {
        const result = await pantryStaffCollection.insertOne(staff);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: "Failed to insert pantry staff" });
      }
    });

    app.get("/pantryStaff", async (req, res) => {
      try {
        const pantryStaff = await pantryStaffCollection.find().toArray();
        res.status(200).json(pantryStaff);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch pantry staff" });
      }
    });

    app.get("/pantryStaff/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const staff = await pantryStaffCollection.findOne({
          _id: new ObjectId(id),
        });
        staff
          ? res.status(200).json(staff)
          : res.status(404).json({ error: "Pantry Staff not found" });
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch pantry staff" });
      }
    });

    app.patch("/pantryStaff/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      try {
        const result = await pantryStaffCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );
        result.modifiedCount > 0
          ? res
              .status(200)
              .json({ message: "Pantry Staff updated successfully" })
          : res.status(404).json({ error: "Pantry Staff not found" });
      } catch (error) {
        res.status(500).json({ error: "Failed to update pantry staff" });
      }
    });

    app.delete("/pantryStaff/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const result = await pantryStaffCollection.deleteOne({
          _id: new ObjectId(id),
        });
        result.deletedCount > 0
          ? res
              .status(200)
              .json({ message: "Pantry Staff deleted successfully" })
          : res.status(404).json({ error: "Pantry Staff not found" });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete pantry staff" });
      }
    });

    // CRUD Operations for Meals
    app.post("/meals", async (req, res) => {
      const meal = req.body;
      try {
        const result = await mealCollection.insertOne(meal);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: "Failed to insert meal data" });
      }
    });

    app.get("/meals", async (req, res) => {
      try {
        const meals = await mealCollection.find().toArray();
        res.status(200).json(meals);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch meals" });
      }
    });

    app.get("/meals", async (req, res) => {
      const { status } = req.query;
      try {
        const query = status ? { status } : {};
        const meals = await Meals.find(query); // Adjust based on your database setup
        res.json(meals);
      } catch (err) {
        res.status(500).json({ error: "Failed to fetch meals" });
      }
    });

    app.get("/meals/:id", async (req, res) => {
      const id = req.params.id;

      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid meal ID format" });
      }

      try {
        const meal = await mealCollection.findOne({ _id: new ObjectId(id) });

        if (meal) {
          res.status(200).json(meal);
        } else {
          res.status(404).json({ error: "Meal not found" });
        }
      } catch (error) {
        console.error("Error fetching meal:", error);
        res.status(500).json({ error: "Failed to fetch meal" });
      }
    });

    const { ObjectId } = require("mongodb"); // Import ObjectId to create a valid ObjectId

    app.patch("/meals/:id", async (req, res) => {
      const id = req.params.id;
      const { status } = req.body; // Expecting the status in the request body

      // Validate the status value before updating
      if (!["Not Started", "In Progress", "Prepared"].includes(status)) {
        return res.status(400).json({
          error:
            "Invalid status value. Allowed values are: Not Started, In Progress, Prepared.",
        });
      }

      // Ensure the ID is valid
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid meal ID" });
      }

      const filter = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: {
          status, // Update only the status field
        },
      };
      const options = { upsert: false }; // Set upsert to false to only update existing meals

      try {
        // Update the meal status in the database
        const result = await mealCollection.updateOne(
          filter,
          updateDoc,
          options
        );

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Meal not found" });
        }

        res.json({ message: "Meal status updated", result });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update meal status" });
      }
    });

    app.delete("/meals/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const result = await mealCollection.deleteOne({
          _id: new ObjectId(id),
        });
        result.deletedCount > 0
          ? res.status(200).json({ message: "Meal deleted successfully" })
          : res.status(404).json({ error: "Meal not found" });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete meal" });
      }
    });

    // CRUD Operations for Delivery Personnel
    app.post("/deliveryPersonnel", async (req, res) => {
      const personnel = req.body;
      try {
        const result = await deliveryPersonnelCollection.insertOne(personnel);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: "Failed to insert delivery personnel" });
      }
    });

    app.get("/deliveryPersonnel", async (req, res) => {
      try {
        const personnel = await deliveryPersonnelCollection.find().toArray();
        res.status(200).json(personnel);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch delivery personnel" });
      }
    });

    app.get("/deliveryPersonnel/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const personnel = await deliveryPersonnelCollection.findOne({
          _id: new ObjectId(id),
        });
        personnel
          ? res.status(200).json(personnel)
          : res.status(404).json({ error: "Delivery Personnel not found" });
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch delivery personnel" });
      }
    });

    app.patch("/deliveryPersonnel/:id", async (req, res) => {
      const id = req.params.id;
      const updateData = req.body;
      try {
        const result = await deliveryPersonnelCollection.updateOne(
          { _id: new ObjectId(id) },
          { $set: updateData }
        );
        result.modifiedCount > 0
          ? res
              .status(200)
              .json({ message: "Delivery Personnel updated successfully" })
          : res.status(404).json({ error: "Delivery Personnel not found" });
      } catch (error) {
        res.status(500).json({ error: "Failed to update delivery personnel" });
      }
    });

    app.delete("/deliveryPersonnel/:id", async (req, res) => {
      const id = req.params.id;
      try {
        const result = await deliveryPersonnelCollection.deleteOne({
          _id: new ObjectId(id),
        });
        result.deletedCount > 0
          ? res
              .status(200)
              .json({ message: "Delivery Personnel deleted successfully" })
          : res.status(404).json({ error: "Delivery Personnel not found" });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete delivery personnel" });
      }
    });

    // Ping MongoDB to confirm connection
    await client.db("admin").command({ ping: 1 });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}
run().catch(console.dir);

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
//////////////////
