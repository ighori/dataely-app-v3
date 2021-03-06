/* tslint:disable max-line-length */
import { shallowMount, createLocalVue, Wrapper } from '@vue/test-utils';
import sinon, { SinonStubbedInstance } from 'sinon';

import * as config from '@/shared/config/config';
import TableColumnComponent from '@/entities/table-column/table-column.vue';
import TableColumnClass from '@/entities/table-column/table-column.component';
import TableColumnService from '@/entities/table-column/table-column.service';

const localVue = createLocalVue();

config.initVueApp(localVue);
const store = config.initVueXStore(localVue);
localVue.component('font-awesome-icon', {});
localVue.component('b-badge', {});
localVue.component('jhi-sort-indicator', {});
localVue.directive('b-modal', {});
localVue.component('b-button', {});
localVue.component('router-link', {});

const bModalStub = {
  render: () => {},
  methods: {
    hide: () => {},
    show: () => {},
  },
};

describe('Component Tests', () => {
  describe('TableColumn Management Component', () => {
    let wrapper: Wrapper<TableColumnClass>;
    let comp: TableColumnClass;
    let tableColumnServiceStub: SinonStubbedInstance<TableColumnService>;

    beforeEach(() => {
      tableColumnServiceStub = sinon.createStubInstance<TableColumnService>(TableColumnService);
      tableColumnServiceStub.retrieve.resolves({ headers: {} });

      wrapper = shallowMount<TableColumnClass>(TableColumnComponent, {
        store,
        localVue,
        stubs: { jhiItemCount: true, bPagination: true, bModal: bModalStub as any },
        provide: {
          tableColumnService: () => tableColumnServiceStub,
        },
      });
      comp = wrapper.vm;
    });

    it('Should call load all on init', async () => {
      // GIVEN
      tableColumnServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.retrieveAllTableColumns();
      await comp.$nextTick();

      // THEN
      expect(tableColumnServiceStub.retrieve.called).toBeTruthy();
      expect(comp.tableColumns[0]).toEqual(expect.objectContaining({ id: 123 }));
    });

    it('should load a page', async () => {
      // GIVEN
      tableColumnServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();

      // THEN
      expect(tableColumnServiceStub.retrieve.called).toBeTruthy();
      expect(comp.tableColumns[0]).toEqual(expect.objectContaining({ id: 123 }));
    });

    it('should not load a page if the page is the same as the previous page', () => {
      // GIVEN
      tableColumnServiceStub.retrieve.reset();
      comp.previousPage = 1;

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(tableColumnServiceStub.retrieve.called).toBeFalsy();
    });

    it('should re-initialize the page', async () => {
      // GIVEN
      tableColumnServiceStub.retrieve.reset();
      tableColumnServiceStub.retrieve.resolves({ headers: {}, data: [{ id: 123 }] });

      // WHEN
      comp.loadPage(2);
      await comp.$nextTick();
      comp.clear();
      await comp.$nextTick();

      // THEN
      expect(tableColumnServiceStub.retrieve.callCount).toEqual(3);
      expect(comp.page).toEqual(1);
      expect(comp.tableColumns[0]).toEqual(expect.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,asc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // GIVEN
      comp.propOrder = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,asc', 'id']);
    });
    it('Should call delete service on confirmDelete', async () => {
      // GIVEN
      tableColumnServiceStub.delete.resolves({});

      // WHEN
      comp.prepareRemove({ id: 123 });
      comp.removeTableColumn();
      await comp.$nextTick();

      // THEN
      expect(tableColumnServiceStub.delete.called).toBeTruthy();
      expect(tableColumnServiceStub.retrieve.callCount).toEqual(1);
    });
  });
});
