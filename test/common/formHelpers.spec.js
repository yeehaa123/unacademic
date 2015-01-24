import FormHelpers from '../../src/scripts/common/formHelpers';

describe("formHelpers", () => {
  let formHelpers;
  let dispatcher;

  beforeEach(() => {
    dispatcher = {}
    dispatcher.queue = sinon.stub();
    dispatcher.setState = sinon.stub();

    formHelpers = new FormHelpers(dispatcher);
  });

  describe("generateUrl", () => {
    let form;
    let model;

    describe("submit", () => {

      beforeEach(() => {
        model = {
          id: '123',
          curator: 'yeehaa'
        };

        form = {
          $setPristine: () => {},
          $setDirty: () => {}
        }
      });

      describe("if form is clean and invalid", () => {

        it("does not call save on the model", () => {

          form.$dirty = false;
          form.$valid = false;

          model.save = sinon.stub();
          formHelpers.submit(form, model);
          expect(model.save).not.called;
        });
      });

      describe("if form is clean and valid", () => {

        it("does not call save on the model", () => {

          form.$dirty = false;
          form.$valid = true;

          model.save = sinon.stub();
          formHelpers.submit(form, model);
          expect(model.save).not.called;
        });
      });

      describe("if form is dirty and valid", () => {
        let promise;

        beforeEach(() => {
          form.$dirty = true;
          form.$valid = true;
        });

        describe("successful save", () => {

          beforeEach(() => {
            promise = Promise.resolve();
            model.save = sinon.stub().returns(promise);
            formHelpers.submit(form, model);
          });

          it("calls save on the model", () => {
            expect(model.save).called;
          });

          it("removes the model from the queue", (done) => {
            promise.then(() => {
              expect(dispatcher.queue).calledWith({remove: '123'})
              done();
            });
          });

          it("set the correct resource id", () => {
            let resource = {
              id: '123',
              curator: 'yeehaa'
            }

            promise.then(() => {
              expect(dispatcher.setState).calledWith({mode: 'learning', resource: resource});
              done();
            });
          });
        });

        describe("failed save", () => {
          beforeEach(() => {
            promise = Promise.reject();
            model.save = sinon.stub().returns(promise);
            formHelpers.submit(form, model);
          });

          it("calls save on the model", () => {
            expect(model.save).called;
          });

          it("leaves the model in the queue", (done) => {
            promise.catch(() => {
              expect(dispatcher.queue).not.called;
              done();
            });
          });
        });
      });
    });

    describe("checkForm", () => {
      let id;
      let form;

      beforeEach(() => {
        id = '123';
        form = {};
      });

      describe("if form is clean", () => {

        it("does not add the model to the queue", () => {
          form.$dirty = false;
          formHelpers.checkForm(form, id, dispatcher);
          expect(dispatcher.queue).not.called;
        });
      });

      describe("if form is dirty", () => {

        it("adds the model to the queue", () => {
          form.$dirty = true;
          formHelpers.checkForm(form, id, dispatcher);
          expect(dispatcher.queue).calledWith({add: id});
        });
      });

      function submitForm(options){
        vm.info = {
          id: '123',
          save: () => {}
        }

        vm.form.$valid = options.valid;
        vm.form.$dirty = options.dirty;
        vm.form.$setPristine = () => {
          vm.form.$dirty = false;
        }

        vm.form.$setDirty = () => {
          vm.form.$dirty = true;
        }

        let promise = $q(function(resolve, reject){
          if(options.resolve){
            resolve();
          } else {
            reject();
          }
        });

        saveModelStub = sinon.stub(vm.info, 'save').returns(promise);

        vm.submit();
        $scope.$digest();
      }

    });
  });
});
