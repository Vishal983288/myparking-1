import React, { useEffect } from 'react';

export const UserProfile = () => {
  useEffect(() => {
    (() => {
      'use strict';
      const forms = document.querySelectorAll('.needs-validation');
      Array.from(forms).forEach((form) => {
        form.addEventListener(
          'submit',
          (event) => {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add('was-validated');
          },
          false
        );
      });
    })();
  }, []);

  return (
    <div style={{textAlign:'center'}}>
      <div className="row g-4">
        <div className="col-12">
         
        </div>

        <div className="col-md-6">
          <div className="card card-primary card-outline mb-4">
            <div className="card-header">
              <div className="card-title">User Profile</div>
            </div>
            <form>
              <div className="card-body">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                </div>
                <div className="input-group mb-3">
                  <input type="file" className="form-control" id="inputGroupFile02" />
                  <label className="input-group-text" htmlFor="inputGroupFile02">
                    Upload
                  </label>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Check me out
                  </label>
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div className="card card-info card-outline mb-4">
            <div className="card-header">
              <div className="card-title">Form Validation</div>
            </div>
            <form className="needs-validation" noValidate>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      defaultValue="First Name"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="validationCustom02" className="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom02"
                      defaultValue="Last Name"
                      required
                    />
                    <div className="valid-feedback">Looks good!</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="validationCustomUsername" className="form-label">
                      Username
                    </label>
                    <div className="input-group has-validation">
                      <span className="input-group-text" id="inputGroupPrepend">
                        @
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="validationCustomUsername"
                        aria-describedby="inputGroupPrepend"
                        required
                      />
                      <div className="invalid-feedback">Please choose a username.</div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="validationCustom03" className="form-label">
                      City
                    </label>
                    <input type="text" className="form-control" id="validationCustom03" required />
                    <div className="invalid-feedback">Please provide a valid city.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="validationCustom04" className="form-label">
                      State
                    </label>
                    <select className="form-select" id="validationCustom04" required>
                      <option value="" disabled>
                        Choose...
                      </option>
                      <option>...</option>
                    </select>
                    <div className="invalid-feedback">Please select a valid state.</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="validationCustom05" className="form-label">
                      Zip
                    </label>
                    <input type="text" className="form-control" id="validationCustom05" required />
                    <div className="invalid-feedback">Please provide a valid zip.</div>
                  </div>

                  <div className="col-12">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="invalidCheck"
                        required
                      />
                      <label className="form-check-label" htmlFor="invalidCheck">
                        Agree to terms and conditions
                      </label>
                      <div className="invalid-feedback">You must agree before submitting.</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <button className="btn btn-info" type="submit">
                  Submit form
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
