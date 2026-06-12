import { useEffect, useState } from "react";
import API from "../services/api";
import RevenueChart from "../components/RevenueChart";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Dashboard() {
  const [data, setData] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] =
    useState(false);

  const [page, setPage] =
    useState(1);

  const [sortBy, setSortBy] =
    useState("date");

  const fetchData = async (
    searchText = "",
    currentPage = 1,
    sort = "date"
  ) => {
    try {
      const res = await API.get(
        `/analytics/dashboard?search=${searchText}&page=${currentPage}&sortBy=${sort}`
      );

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData(
      search,
      page,
      sortBy
    );
  }, [page, sortBy]);

  // CSV EXPORT
  const exportCSV = () => {
    if (!data?.data) return;

    const headers = [
      "Product",
      "Sales",
      "Revenue",
      "Date",
    ];

    const rows = data.data.map(
      (item: any) => [
        item.product,
        item.sales,
        item.revenue,
        new Date(
          item.date
        ).toLocaleDateString(),
      ]
    );

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows]
        .map((e) => e.join(","))
        .join("\n");

    const encodedUri =
      encodeURI(csvContent);

    const link =
      document.createElement("a");

    link.setAttribute(
      "href",
      encodedUri
    );

    link.setAttribute(
      "download",
      "sales_report.csv"
    );

    document.body.appendChild(link);

    link.click();
  };

  // PDF EXPORT
  const exportPDF = () => {
    if (!data?.data) return;

    const doc = new jsPDF();

    doc.text(
      "Sales Analytics Report",
      14,
      15
    );

    autoTable(doc, {
      head: [
        [
          "Product",
          "Sales",
          "Revenue",
          "Date",
        ],
      ],

      body: data.data.map(
        (item: any) => [
          item.product,
          item.sales,
          item.revenue,
          new Date(
            item.date
          ).toLocaleDateString(),
        ]
      ),
    });

    doc.save(
      "sales_report.pdf"
    );
  };

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: darkMode
          ? "#111"
          : "#fff",

        color: darkMode
          ? "#fff"
          : "#000",

        minHeight: "100vh",
      }}
    >
      <h1>Analytics Dashboard</h1>

      {/* BUTTONS */}
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <button
          onClick={() =>
            setDarkMode(
              !darkMode
            )
          }
        >
          {darkMode
            ? "Light Mode ☀️"
            : "Dark Mode 🌙"}
        </button>

        <button
          onClick={exportCSV}
          style={{
            marginLeft: "10px",
          }}
        >
          Export CSV 📁
        </button>

        <button
          onClick={exportPDF}
          style={{
            marginLeft: "10px",
          }}
        >
          Export PDF 📄
        </button>
      </div>

      {/* SEARCH */}
      <input
        type="text"
        placeholder="Search product..."
        value={search}
        onChange={(e) => {
          const value =
            e.target.value;

          setSearch(value);

          fetchData(
            value,
            page,
            sortBy
          );
        }}
        style={{
          padding: "8px",
          marginRight: "10px",
        }}
      />

      {/* SORT */}
      <select
        value={sortBy}
        onChange={(e) =>
          setSortBy(
            e.target.value
          )
        }
      >
        <option value="date">
          Sort by Date
        </option>

        <option value="revenue">
          Sort by Revenue
        </option>

        <option value="sales">
          Sort by Sales
        </option>
      </select>

      {data && (
        <>
          <h3>
            Total Revenue:
            {data.totalRevenue}
          </h3>

          <h3>
            Total Sales:
            {data.totalSales}
          </h3>

          <RevenueChart
            data={data.data}
          />

          <h2>
            Sales Data
          </h2>

          <table
            border={1}
            cellPadding={10}
            style={{
              width: "100%",
              marginTop:
                "10px",

              backgroundColor:
                darkMode
                  ? "#222"
                  : "#fff",

              color: darkMode
                ? "#fff"
                : "#000",
            }}
          >
            <thead>
              <tr>
                <th>Product</th>
                <th>Sales</th>
                <th>Revenue</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {data.data.map(
                (item: any) => (
                  <tr
                    key={
                      item.id
                    }
                  >
                    <td>
                      {
                        item.product
                      }
                    </td>

                    <td>
                      {
                        item.sales
                      }
                    </td>

                    <td>
                      {
                        item.revenue
                      }
                    </td>

                    <td>
                      {new Date(
                        item.date
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>

          {/* PAGINATION */}
          <div
            style={{
              marginTop:
                "20px",
            }}
          >
            <button
              disabled={
                page === 1
              }
              onClick={() =>
                setPage(
                  page - 1
                )
              }
            >
              Previous
            </button>

            <span
              style={{
                margin:
                  "0 10px",
              }}
            >
              Page {page} of{" "}
              {
                data.totalPages
              }
            </span>

            <button
              disabled={
                page ===
                data.totalPages
              }
              onClick={() =>
                setPage(
                  page + 1
                )
              }
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;