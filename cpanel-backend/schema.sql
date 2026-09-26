CREATE TABLE IF NOT EXISTS keyactive (
  id                  CHAR(32)      NOT NULL,            -- random, unguessable (hex of 16 random bytes)
  firstname           VARCHAR(100)  NOT NULL,
  lastname            VARCHAR(100)  NOT NULL,
  surname             VARCHAR(100)  NOT NULL,
  email               VARCHAR(190)  NOT NULL,
  mpesa_number        VARCHAR(15)   NOT NULL,
  mpesa_checkout_id   VARCHAR(100)  DEFAULT NULL,         -- CheckoutRequestID from STK push
  mpesa_reference     VARCHAR(100)  DEFAULT NULL,         -- MpesaReceiptNumber once paid
  amount              DECIMAL(10,2) DEFAULT NULL,         -- KES amount actually paid
  status              ENUM('pending','paid') NOT NULL DEFAULT 'pending',
  activation_key      CHAR(64)      DEFAULT NULL,
  created_at          TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_checkout_id (mpesa_checkout_id),
  KEY idx_activation_key (activation_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
