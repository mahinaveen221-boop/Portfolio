// ===================================================================
// Naveenraja K - Portfolio Interactivity & Animations
// ===================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. Typewriter Effect
  const phrases = [
    "Java Full Stack Developer",
    "Java EE & Spring Boot Specialist",
    "Backend & REST API Architect",
    "TAP Academy Trainee"
  ];
  
  const typingElement = document.getElementById('typing-text');
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function typeWriter() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before new word
    }

    setTimeout(typeWriter, typingSpeed);
  }

  if (typingElement) {
    typeWriter();
  }

  // 2. Navbar Scroll Style
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('show');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('show');
        const icon = mobileToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  // 4. Code Snippet Tabs for Food App
  const codeSnippets = {
    cart: `// CartServlet.java - Session-based Shopping Cart Management
package com.tap.servlet;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import com.tap.model.CartItem;

@WebServlet("/cart")
public class CartServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        HttpSession session = request.getSession();
        Map<Integer, CartItem> cart = (Map<Integer, CartItem>) session.getAttribute("cart");
        if (cart == null) {
            cart = new HashMap<>();
            session.setAttribute("cart", cart);
        }

        String action = request.getParameter("action");
        int itemId = Integer.parseInt(request.getParameter("itemId"));

        if ("add".equals(action)) {
            String name = request.getParameter("name");
            double price = Double.parseDouble(request.getParameter("price"));
            cart.compute(itemId, (k, v) -> v == null ? 
                new CartItem(itemId, name, price, 1) : 
                new CartItem(itemId, name, price, v.getQuantity() + 1));
        } else if ("remove".equals(action)) {
            cart.remove(itemId);
        }

        response.sendRedirect("cart.jsp");
    }
}`,

    dao: `// UserDAOImpl.java - JDBC Data Access Object Pattern
package com.tap.daoimpl;

import java.sql.*;
import com.tap.dao.UserDAO;
import com.tap.model.User;
import com.tap.util.DBUtils;

public class UserDAOImpl implements UserDAO {
    private static final String LOGIN_SQL = 
        "SELECT * FROM users WHERE email = ? AND password = ?";

    @Override
    public User validateUser(String email, String password) {
        User user = null;
        try (Connection con = DBUtils.getConnection();
             PreparedStatement ps = con.prepareStatement(LOGIN_SQL)) {
            
            ps.setString(1, email);
            ps.setString(2, password);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    user = new User(
                        rs.getInt("userId"),
                        rs.getString("name"),
                        rs.getString("email"),
                        rs.getString("role")
                    );
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return user;
    }
}`,

    sql: `-- food_app_db.sql - Relational Schema Architecture
CREATE DATABASE IF NOT EXISTS food_app_tap;
USE food_app_tap;

-- 1. Users Table
CREATE TABLE users (
    userId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20)
);

-- 2. Restaurants Table
CREATE TABLE restaurant (
    restaurantId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    cuisineType VARCHAR(100),
    deliveryTime INT,
    address VARCHAR(255),
    ratings DECIMAL(2,1),
    isActive BOOLEAN DEFAULT TRUE
);

-- 3. Menu Items with Foreign Key
CREATE TABLE menu (
    menuId INT PRIMARY KEY AUTO_INCREMENT,
    restaurantId INT,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    isAvailable BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (restaurantId) REFERENCES restaurant(restaurantId)
);

-- 4. Orders & Transaction Records
CREATE TABLE orders (
    orderId INT PRIMARY KEY AUTO_INCREMENT,
    userId INT,
    restaurantId INT,
    totalAmount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'Pending',
    paymentMode VARCHAR(50),
    orderDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (restaurantId) REFERENCES restaurant(restaurantId)
);`
  };

  const codeTabs = document.querySelectorAll('.code-tab-btn');
  const codeDisplay = document.getElementById('code-display');

  if (codeTabs.length > 0 && codeDisplay) {
    codeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        codeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const key = tab.getAttribute('data-tab');
        if (codeSnippets[key]) {
          codeDisplay.textContent = codeSnippets[key];
        }
      });
    });
  }

  // 5. Contact Form Simulation & WhatsApp
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      const mailtoLink = `mailto:mahinaveen221@gmail.com?subject=Contact from ${encodeURIComponent(name)}&body=${encodeURIComponent("Sender Email: " + email + "\n\nMessage:\n" + message)}`;
      window.location.href = mailtoLink;
      alert("Opening your mail app to send your message to Naveenraja K (mahinaveen221@gmail.com)!");
    });
  }

  // 6. Copy Email Quick Tool
  window.copyEmail = function() {
    navigator.clipboard.writeText('mahinaveen221@gmail.com').then(() => {
      alert("Copied email address: mahinaveen221@gmail.com to clipboard!");
    });
  };

  // 7. Interactive Food App Simulator
  let simCart = [];

  window.addToSimCart = function(name, price) {
    const existing = simCart.find(i => i.name === name);
    if (existing) {
      existing.qty++;
    } else {
      simCart.push({ name, price, qty: 1 });
    }
    renderSimCart();
  };

  window.removeSimCart = function(index) {
    simCart.splice(index, 1);
    renderSimCart();
  };

  function renderSimCart() {
    const list = document.getElementById('sim-cart-items');
    const count = document.getElementById('sim-cart-count');
    const totalVal = document.getElementById('sim-cart-total-val');
    const badge = document.getElementById('sim-order-success');
    if (badge) badge.style.display = 'none';

    if (!list) return;

    if (simCart.length === 0) {
      list.innerHTML = '<div style="color: #64748b; font-size: 0.82rem; text-align: center; padding-top: 20px;">Cart is empty. Click "+ Add" on any dish above!</div>';
      count.textContent = '0';
      totalVal.textContent = '₹0.00';
      return;
    }

    let html = '';
    let total = 0;
    let totalQty = 0;

    simCart.forEach((item, idx) => {
      const itemSubtotal = item.price * item.qty;
      total += itemSubtotal;
      totalQty += item.qty;
      html += `
        <div class="sim-cart-row">
          <span>${item.name} (${item.qty}x)</span>
          <div>
            <span style="margin-right: 6px;">₹${itemSubtotal}</span>
            <button onclick="removeSimCart(${idx})" title="Remove item">&times;</button>
          </div>
        </div>
      `;
    });

    list.innerHTML = html;
    count.textContent = totalQty;
    totalVal.textContent = `₹${(total * 1.05).toFixed(2)}`;
  }

  window.checkoutSimOrder = function() {
    if (simCart.length === 0) {
      alert("Cart is empty! Click '+ Add' on any dish first.");
      return;
    }
    const badge = document.getElementById('sim-order-success');
    const orderIdSpan = document.getElementById('sim-order-id');
    const randomId = Math.floor(10000 + Math.random() * 90000);
    if (orderIdSpan) orderIdSpan.textContent = `#TAP-${randomId}`;
    if (badge) badge.style.display = 'block';
    simCart = [];
    const list = document.getElementById('sim-cart-items');
    const count = document.getElementById('sim-cart-count');
    const totalVal = document.getElementById('sim-cart-total-val');
    if (list) list.innerHTML = '<div style="color: #10b981; font-size: 0.82rem; text-align: center; padding-top: 20px;">✅ Transaction Committed! Check simulated status below.</div>';
    if (count) count.textContent = '0';
    if (totalVal) totalVal.textContent = '₹0.00';
  };
});
