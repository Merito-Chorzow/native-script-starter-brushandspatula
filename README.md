# Inventory App

Aplikacja mobilna do zarządzania prostą listą produktów, stworzona w **NativeScript + Angular**.

## Opis aplikacji

Aplikacja umożliwia takie akcje użytkownika jak:

* dodawanie produktów,
* przeglądanie ich na liście,
* wyświetlanie szczegółów wybranego produktu,
* integrację z zewnętrznym API (JSON Server),
* natywna funkcja wibracji w telefonie po dodaniu/usunięciu produktu.

Aplikacja nie zapisuje danych lokalnie ani na stałe.

---

## Technologie

* **NativeScript**
* **Angular**
* **TypeScript**
* **JSON Server (Mock API)**
* Natywne API urządzenia mobilnego (aparat i wibracje)

---

## Funkcjonalności

### Dodawanie nowego produktu

Aby przejść do formularza dodawania produktu należy kliknąć na "ADD" na menu górnym aplikacji, lub jeśli lista jest pusta możliwe też będzie przejście tam po kliknięciu na widoczny wówczas przycisk "Add first item" na liście produktów. 

Użytkownik może dodać nowy produkt, podając:

* **Name** – nazwa produktu (**wymagana**),
* **Code** – kod produktu (**wymagany**),
* **Status** – status produktu (np. *In stock*),
* **Description** – opcjonalny opis,
* **Photo** – opcjonalne zdjęcie wykonane aparatem urządzenia mobilnego.

Zdjęcie dodawane jest z użyciem **natywnej funkcji aparatu**. Po dodaniu produktu do listy telefon wykonuje pojedynczą wibrację (natywna funkcja). Zaopiekowano w aplikacji zgodę na użycie aparatu na urządzeniu mobilnym oraz możliwość wykonania wibracji w telefonie.

<img width="738" height="1600" alt="image" src="https://github.com/user-attachments/assets/f5383819-9467-4132-9958-b7a05337204a" />

<img width="738" height="1600" alt="image" src="https://github.com/user-attachments/assets/cbe3c114-4437-48d7-9fa5-63d6c13765fe" />

<img width="738" height="1600" alt="image" src="https://github.com/user-attachments/assets/731cf29c-6e75-495b-b53e-97fcb5c167fe" />

<img width="738" height="1600" alt="image" src="https://github.com/user-attachments/assets/615e4f51-4b5e-4c7b-aca6-3387e0521d55" />

---

### Walidacja formularza

Formularz dodawania produktu zawiera podstawową walidację:

* pole **Name** jest wymagane,
* pole **Code** jest wymagane,
* przy próbie zapisu pustego formularza wyświetlane są komunikaty walidacyjne.
  
<img width="738" height="1600" alt="image" src="https://github.com/user-attachments/assets/e794390b-dc02-4d45-8ea1-bc98c88e72b3" />

---

### Lista produktów

* Wyświetlana jest lista wszystkich dodanych produktów,
* każdy element listy pokazuje:

  * nazwę produktu,
  * status,
  * kod produktu,
* produkty nie są zapisywane trwale, po restarcie aplikacji lista jest pusta.
  
<img width="738" height="1600" alt="image" src="https://github.com/user-attachments/assets/dfa4bce5-561c-4376-8c8a-db2906f7fc56" />

<img width="738" height="1600" alt="image" src="https://github.com/user-attachments/assets/5d834435-56d0-49e2-9422-576dd7914621" />


---

### Widok szczegółowy produktu

Po kliknięciu w produkt na liście użytkownik przechodzi do widoku szczegółowego, gdzie wyświetlane są:

* nazwa produktu,
* kod produktu,
* status,
* opis (jeśli został dodany),
* zdjęcie produktu (jeśli zostało wykonane).
  
<img width="738" height="1600" alt="image" src="https://github.com/user-attachments/assets/13ef6d64-9618-4992-a67d-3e22690290a3" />

Z poziomu widoku szczegółowego możliwe jest:

* usunięcie produktu,
* powrót do listy produktów.

Po usunięciu produktu, telefon wykonuje pojedynczą wibrację (funkcja natywna urządzenia).

---

### Integracja z API (JSON Server)

Aplikacja posiada osobny widok **API Demo**, który:

* pobiera dane z **Mock API (JSON Server)**,
* wykorzystuje endpoint typu **GET /posts**,
* wyświetla pobrane dane w formie listy.
  
<img width="738" height="1600" alt="image" src="https://github.com/user-attachments/assets/65000043-faca-4840-98d9-160b2cde8cf3" />

<img width="738" height="1600" alt="image" src="https://github.com/user-attachments/assets/a6b4a21a-dc45-489b-b9d1-0336a7784ff2" />


Aby przejść do widoku należy kliknąć na "API DEMO" na górnym menu aplikacji.

---

## Struktura widoków

* **Product list** – lista produktów
* **New item** – formularz dodawania produktu
* **Details** – widok szczegółowy produktu
* **API demo** – widok danych pobranych z zewnętrznego API

---

## Uruchomienie projektu

1. Zainstaluj zależności:
   npm i

2. Uruchom aplikację:

   ns run android

   lub

   ns run ios
   
(testowano na rzeczywistym urządzeniu mobilnym z Androidem)

