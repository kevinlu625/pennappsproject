import sqlite3
import openai
import datetime

DATABASE_NAME = "gardens.db"

# Database setup
def setup_db():
    with sqlite3.connect(DATABASE_NAME) as conn:
        cursor = conn.cursor()
        
        # Create users table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                user_id INTEGER PRIMARY KEY,
                name TEXT NOT NULL
            )
        """)
        
        # Create gardens table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS gardens (
                garden_id INTEGER PRIMARY KEY,
                garden_name TEXT,
                user_id INTEGER,
                location_name TEXT NOT NULL,
                type TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users(user_id)
            )
        """)
        
        # Create plants table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS plants (
                plant_id INTEGER PRIMARY KEY,
                plant_name TEXT,
                garden_id INTEGER,
                type TEXT NOT NULL,
                planted_date TEXT NOT NULL,
                image BLOB,
                FOREIGN KEY (garden_id) REFERENCES gardens(garden_id)
            )
        """)
        
        conn.commit()


# User operations 
    # this will be called whenever a new account is genereated
def add_user(user_id, name):
    with sqlite3.connect(DATABASE_NAME) as conn:
        cursor = conn.cursor()
        try:
            cursor.execute("INSERT INTO users (user_id, name) VALUES (?, ?)", (user_id, name,))
            conn.commit()

        # Throws an error in case of duplicate user_i
        except sqlite3.IntegrityError:
            raise ValueError(f"user_id {user_id} is already in use!")


# Garden operations
def add_garden(user_id, location_name, garden_type):
    with sqlite3.connect(DATABASE_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO gardens (user_id, location_name, type) VALUES (?, ?, ?)",
            (user_id, location_name, garden_type,)
        )
        conn.commit()


# Plant operations
def add_plant(garden_id, name, plant_type, planted_date, image_path=None):
    image = None
    if image_path:
        with open(image_path, 'rb') as file:
            image = file.read()
    
    with sqlite3.connect(DATABASE_NAME) as conn:
        cursor = conn.cursor()
        cursor.execute(
            "INSERT INTO plants (garden_id, name, type, planted_date, image) VALUES (?, ?, ?, ?, ?)",
            (garden_id, name, plant_type, planted_date, image)
        )
        conn.commit()


if __name__ == "__main__":
    setup_db()

    # Sample operations:
    add_user("John Doe")
    add_garden(1, "Backyard", "Vegetable Garden")
    add_plant(1, "Tomato", "Fruit", str(datetime.date.today()), "path_to_image.jpg")

