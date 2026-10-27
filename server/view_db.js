const { MongoClient } = require("mongodb");

async function viewDatabase() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("\n=======================================================");
    console.log("   CONNECTED TO MONGODB: velvetBrewCafe");
    console.log("=======================================================\n");

    const db = client.db("velvetBrewCafe");

    // 1. Menu Items
    const menuCount = await db.collection("menu").countDocuments();
    console.log(`[1] MENU COLLECTION: (${menuCount} items)`);
    const sampleMenu = await db.collection("menu").find().limit(5).toArray();
    sampleMenu.forEach((item, i) => {
      console.log(`    ${i + 1}. [${item.category}] ${item.name} - $${item.price.toFixed(2)} (${item.isVeg ? "Veg" : "Non-Veg"})`);
    });
    console.log(`    ... and ${menuCount - 5} more items.\n`);

    // 2. Users
    const users = await db.collection("users").find({}, { projection: { password: 0 } }).toArray();
    console.log(`[2] REGISTERED USERS: (${users.length} users)`);
    users.forEach((u, i) => {
      console.log(`    ${i + 1}. Name: ${u.name} | Email: ${u.email} | Phone: ${u.phone}`);
    });
    console.log("");

    // 3. Orders
    const orders = await db.collection("orders").find().toArray();
    console.log(`[3] ORDERS: (${orders.length} orders)`);
    orders.forEach((o, i) => {
      console.log(`    ${i + 1}. Order ID: ${o.orderId} | Total: $${o.total} | Type: ${o.orderType} | Status: ${o.status}`);
    });
    console.log("");

    // 4. Reservations
    const reservations = await db.collection("reservations").find().toArray();
    console.log(`[4] TABLE RESERVATIONS: (${reservations.length} reservations)`);
    reservations.forEach((r, i) => {
      console.log(`    ${i + 1}. Booking ID: ${r.bookingId} | Name: ${r.name} | Date: ${r.date} | Slot: ${r.timeSlot} | Guests: ${r.guests}`);
    });

    console.log("\n=======================================================\n");
  } catch (err) {
    console.error("Database connection error:", err.message);
  } finally {
    await client.close();
  }
}

viewDatabase();
