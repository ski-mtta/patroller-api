openssl x509 -outform der -in ./server-ca.pem -out ./server-ca.crt && \
openssl pkey -in ./server-ca.pem -out ./server-ca-key.pem