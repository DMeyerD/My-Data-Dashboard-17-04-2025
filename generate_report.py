import pandas as pd
from datetime import datetime
import os

#load the data
base_path = os.path.dirname(__file__)
file_path = os.path.join(base_path, "/app/static/frontend_data.json")
df = pd.read_json(file_path)
output_folder ="reports"
os.makedirs(output_folder, exist_ok=True)
#generate some summary stats
total_revenue = df["revenue"].sum()
average_revenue = df["revenue"].mean()
top_product = df.sort_values("revenue", ascending=False).iloc[0]

#group totals
revenue_by_category = df.groupby("category")["revenue"].sum()

summary = pd.DataFrame({
    "Metric": ["Total Revenue", "Average Revenue", "Top Product", "Top Product Revenue"],
    "Value": [total_revenue, average_revenue, top_product["name"], top_product["revenue"]]
})

timestamp = datetime.now().strftime("%Y-%m-%d_%H-%M")
report_path = os.path.join(output_folder, f"report_{timestamp}.xlsx")

#Write to Excel with summary + breakdown

with pd.ExcelWriter(report_path, engine="openpyxl") as writer:
    summary.to_excel(writer, sheet_name="Summary", index =False)
    revenue_by_category.to_frame(name="Revenue").to_excel(writer, sheet_name = "By Category")
    df.to_excel(writer, sheet_name="Raw Data", index=False)

print(f"Report generated: {report_path}")

