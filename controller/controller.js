const { sql, poolPromise } = require("../database/db");
const fs = require("fs");
var rawdata = fs.readFileSync("./query/queries.json");
var queries = JSON.parse(rawdata);

class MainController {
  // ============= For admin =============
  async getListUsers(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(queries.getListUsers);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async getListProducts(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(queries.getListProducts);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  //maso,ten,nhasanxuat,hinhanh,mota,thongso,giabanhienhanh,idnhomsanpham
  async postAddProduct(req, res) {
    try {
      if (
        req.body.ten != null &&
        req.body.nhasanxuat != null &&
        req.body.hinhanh != null &&
        req.body.mota != null &&
        req.body.thongso != null &&
        req.body.giabanhienhanh != null &&
        req.body.idnhomsanpham != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("maso", sql.VarChar, req.body.maso)
          .input("ten", sql.NVarChar, req.body.ten)
          .input("nhasanxuat", sql.NVarChar, req.body.nhasanxuat)
          .input("hinhanh", sql.VarChar, req.body.hinhanh)
          .input("mota", sql.NVarChar, req.body.mota)
          .input("thongso", sql.NVarChar, req.body.thongso)
          .input("giabanhienhanh", sql.Float, req.body.giabanhienhanh)
          .input("tinhtrang", sql.SmallInt, req.body.tinhtrang)
          .query(queries.addProduct);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async postUpdateProduct(req, res) {
    try {
      if (
        req.body.ten != null &&
        req.body.nhasanxuat != null &&
        req.body.hinhanh != null &&
        req.body.mota != null &&
        req.body.thongso != null &&
        req.body.giabanhienhanh != null &&
        req.body.idnhomsanpham != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("maso", sql.VarChar, req.body.maso)
          .input("ten", sql.NVarChar, req.body.ten)
          .input("nhasanxuat", sql.NVarChar, req.body.nhasanxuat)
          .input("hinhanh", sql.VarChar, req.body.hinhanh)
          .input("mota", sql.NVarChar, req.body.mota)
          .input("thongso", sql.NVarChar, req.body.thongso)
          .input("giabanhienhanh", sql.Float, req.body.giabanhienhanh)
          .input("tinhtrang", sql.SmallInt, req.body.tinhtrang)
          .query(queries.updateProduct);
        res.json(result);
      } else {
        res.send("All fields are required!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async postDeleteProduct(req, res) {
    try {
      if (req.body.id != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("id", sql.Int, req.body.id)
          .query(queries.deleteProduct);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  // ============= For general =============
  async getAllCategory(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(queries.getAllCategory);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getProducts(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("idnhomsanpham", sql.Int, req.params.idnhomsanpham)
        .query(queries.getProductsById);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  async getProductDetails(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("id", sql.Int, req.params.id)
        .query(queries.getProductDetailsById);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }

  // ============= For user =============
  async getAllData(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(queries.getAllData);
      res.json(result.recordset);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async login(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("tendangnhap", sql.VarChar, req.body.tendangnhap)
        .input("matkhau", sql.VarChar, req.body.matkhau)
        .query(queries.checkUserValid);
      if (result.recordset[0]) {
        res.json({ success: true, data: result.recordset[0] });
      } else {
        res.json({
          success: false,
          data: "Tên đăng nhập và mật khẩu k trùng khớp",
        });
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async getShoppingCart(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool
        .request()
        .input("id", sql.Int, req.body.id)
        .query(queries.getShoppingCartById);
      console.log(res.recordset);
      res.json({ success: true, data: result.recordset });
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async checkValidUser(req, res) {
    try {
      const pool = await poolPromise;
      const result = await pool.request().query(queries.getAllData);
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async addRecipient(req, res) {
    try {
      if (
        req.body.hoten != null &&
        req.body.diachi != null &&
        req.body.SDT != null &&
        req.body.idtaikhoan != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("hoten", sql.NVarChar, req.body.hoten)
          .input("diachi", sql.NVarChar, req.body.diachi)
          .input("SDT", sql.VarChar, req.body.SDT)
          .input("idtaikhoan", sql.Int, req.body.idtaikhoan)
          .query(queries.addRecipient);
          if (result) {
            res.json({ success: true, data: "Tạo mới thành công" });
          } else {
            res.json({
              success: false,
              data: "Please fill all the details!",
            });
          }
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  //hoten,ngaysinh,CMND,diachi,tendangnhap,matkhau,email,vaitro,tinhtrang
  // 1 ad 0 cus 1 active 0 inactive
  async signup(req, res) {
    try {
      if (
        req.body.CMND != null &&
        req.body.diachi != null &&
        req.body.tendangnhap != null &&
        req.body.matkhau != null &&
        req.body.email != null &&
        req.body.vaitro != null &&
        req.body.tinhtrang != null
      ) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("hoten", sql.NVarChar, req.body.hoten)
          .input("ngaysinh", sql.Date, req.body.ngaysinh)
          .input("CMND", sql.NVarChar, req.body.CMND)
          .input("diachi", sql.NVarChar, req.body.diachi)
          .input("tendangnhap", sql.VarChar, req.body.tendangnhap)
          .input("matkhau", sql.VarChar, req.body.matkhau)
          .input("email", sql.VarChar, req.body.email)
          .input("vaitro", sql.SmallInt, req.body.vaitro)
          .input("tinhtrang", sql.SmallInt, req.body.tinhtrang)
          .query(queries.addNewUser);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async updateData(req, res) {
    try {
      if (req.body.password != null && req.body.name != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("newPassword", sql.VarChar, req.body.password)
          .input("userName", sql.VarChar, req.body.name)
          .query(queries.updateUserDetails);
        res.json(result);
      } else {
        res.send("All fields are required!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
  async deleteData(req, res) {
    try {
      if (req.body.name != null) {
        const pool = await poolPromise;
        const result = await pool
          .request()
          .input("userName", sql.VarChar, req.body.name)
          .query(queries.deleteUser);
        res.json(result);
      } else {
        res.send("Please fill all the details!");
      }
    } catch (error) {
      res.status(500);
      res.send(error.message);
    }
  }
}

const controller = new MainController();
module.exports = controller;
