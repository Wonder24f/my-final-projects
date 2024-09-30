import tkinter as tk
from tkinter import messagebox
from tkcalendar import Calendar
import datetime

# Initialize the main window
root = tk.Tk()
root.title("Event Calendar")

# Event storage
events = []

def add_event():
    event_name = event_name_entry.get()
    event_date = calendar.get_date()
    event_category = category_var.get()

    if event_name and event_date and event_category:
        events.append({
            'name': event_name,
            'date': event_date,
            'category': event_category
        })
        messagebox.showinfo("Success", f"Event '{event_name}' added on {event_date} under '{event_category}' category.")
        event_name_entry.delete(0, tk.END)  # Clear the entry after adding
        update_event_list()
    else:
        messagebox.showwarning("Error", "Please fill in all fields.")

def update_event_list():
    event_list.delete(0, tk.END)  # Clear the current list
    for event in events:
        event_list.insert(tk.END, f"{event['date']} - {event['name']} ({event['category']})")

def filter_by_category():
    selected_category = category_var.get()
    event_list.delete(0, tk.END)  # Clear the current list
    filtered_events = [event for event in events if event['category'] == selected_category]
    if not filtered_events:
        messagebox.showinfo("Info", f"No events found under '{selected_category}' category.")
    else:
        for event in filtered_events:
            event_list.insert(tk.END, f"{event['date']} - {event['name']} ({event['category']})")

# Create the UI components
calendar = Calendar(root, selectmode="day", year=2024, month=9, day=20)
calendar.pack(pady=20)

# Event Name Input
event_name_label = tk.Label(root, text="Event Name")
event_name_label.pack()
event_name_entry = tk.Entry(root)
event_name_entry.pack()

# Event Category Dropdown
category_label = tk.Label(root, text="Select Category")
category_label.pack()

category_var = tk.StringVar()
category_dropdown = tk.OptionMenu(root, category_var, "Community", "Workshops", "Education")
category_dropdown.pack()

# Add Event Button
add_event_button = tk.Button(root, text="Add Event", command=add_event)
add_event_button.pack(pady=10)

# Event List Display
event_list_label = tk.Label(root, text="Events:")
event_list_label.pack()
event_list = tk.Listbox(root, width=50, height=10)
event_list.pack()

# Filter by Category Button
filter_button = tk.Button(root, text="Filter by Category", command=filter_by_category)
filter_button.pack(pady=5)

# Run the Tkinter main loop
root.mainloop()
