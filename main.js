$(document).ready(function () {
  // Gọi API và hiển thị dữ liệu
  $.ajax({
    url: "./db.json",
    method: "GET",
    dataType: "json",
    success: function (data) {
      const companies = data.companies || []; // Nếu "companies" không tồn tại, dùng mảng rỗng
      companies.forEach((company, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${company.name}</td>
                <td>${
                  company.address ||
                  '<p style="color: red; margin: 0">Không có thông tin</p>'
                }</td>
                  <td>${
                    company.region ||
                    '<p style="color: red; margin: 0">Không có thông tin</p>'
                  }</td>
                    <td>${
                      company.disadvantages ||
                      '<p style="color: red; margin: 0">Không có thông tin</p>'
                    }</td>
                      <td>${
                        company.advice ||
                        '<p style="color: red; margin: 0">Không có thông tin</p>'
                      }</td>
                        <td>${
                          company.advantages ||
                          '<p style="color: red; margin: 0">Không có thông tin</p>'
                        }</td>

            </tr>
        `;
        $("#company-table-body").append(row);
      });
    },
    error: function (xhr, status, error) {
      console.error("Lỗi khi gọi API:", error);
      alert("Không thể tải dữ liệu từ API.");
    },
  });
});
