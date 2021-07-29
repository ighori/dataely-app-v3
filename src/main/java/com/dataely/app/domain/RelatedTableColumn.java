package com.dataely.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * A RelatedTableColumn.
 */
@Entity
@Table(name = "related_table_column", uniqueConstraints = { @UniqueConstraint(columnNames = { "column_name", "related_table_id" }) })
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class RelatedTableColumn implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "rel_c_id_seq", sequenceName = "rel_c_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "rel_c_id_seq")
    private Long id;

    @NotNull
    @Column(name = "column_name", nullable = false)
    private String columnName;

    @Column(name = "column_type")
    private String columnType;

    @CreationTimestamp
    @Column(name = "creation_date")
    private Instant creationDate;

    @UpdateTimestamp
    @Column(name = "last_updated")
    private Instant lastUpdated;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @NotNull
    @JsonIgnoreProperties(value = { "tablesDefinition" }, allowSetters = true)
    private RelatedTable relatedTable;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RelatedTableColumn id(Long id) {
        this.id = id;
        return this;
    }

    public String getColumnName() {
        return this.columnName;
    }

    public RelatedTableColumn columnName(String columnName) {
        this.columnName = columnName;
        return this;
    }

    public void setColumnName(String columnName) {
        this.columnName = columnName;
    }

    public String getColumnType() {
        return this.columnType;
    }

    public RelatedTableColumn columnType(String columnType) {
        this.columnType = columnType;
        return this;
    }

    public void setColumnType(String columnType) {
        this.columnType = columnType;
    }

    public Instant getCreationDate() {
        return this.creationDate;
    }

    public RelatedTableColumn creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Instant getLastUpdated() {
        return this.lastUpdated;
    }

    public RelatedTableColumn lastUpdated(Instant lastUpdated) {
        this.lastUpdated = lastUpdated;
        return this;
    }

    public void setLastUpdated(Instant lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public RelatedTable getRelatedTable() {
        return this.relatedTable;
    }

    public RelatedTableColumn relatedTable(RelatedTable relatedTable) {
        this.setRelatedTable(relatedTable);
        return this;
    }

    public void setRelatedTable(RelatedTable relatedTable) {
        this.relatedTable = relatedTable;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RelatedTableColumn)) {
            return false;
        }
        return id != null && id.equals(((RelatedTableColumn) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RelatedTableColumn{" +
            "id=" + getId() +
            ", columnName='" + getColumnName() + "'" +
            ", columnType='" + getColumnType() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastUpdated='" + getLastUpdated() + "'" +
            "}";
    }
}
