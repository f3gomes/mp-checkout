"use client";

import styles from "./page.module.css";
import { initMercadoPago } from "@mercadopago/sdk-react";
import { Payment } from "@mercadopago/sdk-react";

export default function Home() {
  initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!);

  const initialization = {
    amount: 100,
  };

  const customization: any = {
    paymentMethods: {
      ticket: "all",
      bankTransfer: "all",
      creditCard: "all",
      debitCard: "all",
      mercadoPago: "all",
    },
  };

  const onSubmit = async ({ selectedPaymentMethod, formData }: any) => {
    // callback chamado ao clicar no botão de submissão dos dados
    const url = "http://localhost:9000/process_payment";
    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((response) => {
          // receber o resultado do pagamento
          response.resolve();
        })
        .catch((error) => {
          // lidar com a resposta de erro ao tentar criar o pagamento
          reject();
        });
    });
  };
  const onError = async (error: any) => {
    // callback chamado para todos os casos de erro do Brick
    console.log(error);
  };
  const onReady = async () => {
    /*
    Callback chamado quando o Brick estiver pronto.
    Aqui você pode ocultar loadings do seu site, por exemplo.
  */
  };

  return (
    <main className={styles.main}>
      <h1>Home</h1>

      <Payment
        initialization={initialization}
        customization={customization}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
      />
    </main>
  );
}
