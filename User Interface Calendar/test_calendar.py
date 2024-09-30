import tkinter as tk
from tkcalendar import Calendar

# Create the main window
root = tk.Tk()
root.title("tkcalendar Test")

# Create a Calendar widget
cal = Calendar(root, selectmode='day', year=2024, month=9, day=29)
cal.pack(pady=20)

# Function to print selected date
def show_date():
    print("Selected Date:", cal.get_date())

# Add a button to print the selected date
tk.Button(root, text="Get Date", command=show_date).pack(pady=10)

# Run the Tkinter main loop
root.mainloop()
