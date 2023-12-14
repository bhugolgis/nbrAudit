# Navyug Beneficiary Registration

Navyug Beneficiary Registration is a new self-contained product which provides various opportunities to beneficiaries in Maharashtra. It comes under the Mahapreit A subsidiary of MPBCDC (Mahatma Phule Backward Class Development Corporation LTD) which provides training and loans to beneficiaries.
This Navyug Beneficiary Registration provides all the services which includes Jobs, Training, Loan, and some special Schemes for beneficiary in Maharashtra.

## Cloning

Git is a prerequisite for cloning the repo.

```bash
git clone https://github.com/bhugolgis/nbrmahapreit.git
```

Once the repo has been cloned in your local system, Open the folder using your usable editor like [VSCode](https://code.visualstudio.com/download) and then install the node modules.

To install Node modules.

```bash
npm i
```

## Folder Structure Conventions Global

> Folder structure and naming conventions of the files and folder in this project.

```
|--- src                            - Contains the whole project
    |--- apps                       - Contains all the Components user wise.
    |--- Components                 - Contains the main layout page of the whole application.
    |--- Data                       - Contains all the JSON data and files required for this project.
    |--- libs
        |--- api                    - All the common Api calls are specified here.
        |--- assets                 - Contains all the assets for this projects.
        |--- Common-ui              - Contains all the components which are common throughout the portal.
        |--- routes                 - All the routes (API endpoint) are here and should be specified here and never should he hardcoded.
        |--- utils
            |--- fetch-utils        - Contains all the axios Instances which are used throughout the portal to make api calls.
            |--- sessionStorage     - All the variables which are stored during login are retrieved here and stored in the variable and then that variable is used in the components in which they are required.
            |--- theme              - Contains all the color codes and styles defined in json format so the color and properties of styles should never be hardcoded. All the styles shouldbe imported from this theme itself.
            |--- urls               - This file contains the dev and test urls.
|--- package.json                   - Contains all the modules required for this project.
|--- .gitignore                     - Contains the name of folders and file which you dont want to push on github
```

## Default User folder structure

```
|--- User-side
    |--- src                        - main folder for that individual user which contains all the compoents and styles.
        |--- app
            |--- api                - All the API calls for fetching or posting data data in only this particular user.
            |--- constants          - Here the constants are defined like columns for table etc.
            |--- pages              - Pages folder consists of all the components folder which are displayed in this user login.
    |--- index file                 - Main file of that user where all the components are rendered.
    |--- style file                 - Main style file for that particular user.

```

## User Roles and module access.

> Admin

Admin has the following access -

    - can check all the assisted beneficiary List.
    - Can check all the current beneficiary list and search as per their name and district.
    - Can approve the status for job once it is approved by CGM.
    - Can approve the loan form once it is approved from below other levels of users.
    - Can check all the loan forms, training applications, job applciations and special schemes applications which are applied by the beneficiary.

> Cgm

Cgm has the following access -

    - Can Approve the special scheme and job applciations applied by beneficiary.
    - Can Create a job for beneficiary.
    - Can check the list and manage all the jobs.

> Scrutiny Clerk

Clerk has the following access -

    - Can check the number of loan applications coming to approval.
    - Can verify all the beneficiary loan application details and pass them to district manager.

> District Manager

DM has the following access -

    - Can Create and manage all the training for beneficiary.
    - Can approve the loan form which comes from Scrutiny and once the details are verified it can be passed on to Regional Manager.

> Mahapreit Admin

Maharpreit Admin has the following access -

    - Can check the training and job applications and also special scheme applications.

> MPBCDC Admin

MPBCDC Admin has the following access -

    - Can check the loan applications count and also the details page.
    - Can process the approval of loan forms.

> Regional Manager

RM has the following access -

    - Can process the approval of loan forms which are approved from District Manager.

> Beneficiary

Beneficiary has the following access -

    - Can apply for the job, loans, special schemes and training.
    - For applying to any module beneficiary has to be registered on the portal and complete the 7 step profile.
    - Can access the application of loan, training, special schemes and jobs,
    - Can delete the training or job applications after applying before it is selected.
