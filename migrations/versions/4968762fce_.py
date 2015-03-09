# revision identifiers, used by Alembic.
revision = '4968762fce'
down_revision = None

from alembic import op
import sqlalchemy as sa


def upgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=200), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('name', sa.String(length=120), nullable=True),
    sa.Column('encrypted_password', sa.String(length=60), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('task',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.Column('name', sa.String(length=255), nullable=True),
    sa.Column('status', sa.String(length=255), nullable=True),
    sa.Column('description', sa.String(length=500), nullable=True),
    sa.Column('date_added', sa.Date(), nullable=True),
    sa.Column('date_completed', sa.Date(), nullable=True),
    sa.Column('date_due', sa.Date(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.Column('task_id', sa.Integer(), nullable=True),
    sa.Column('date', sa.DateTime(), nullable=False),
    sa.Column('text', sa.String(length=500), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['user.id'], ),
    sa.ForeignKeyConstraint(['task_id'], ['task.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    ### end Alembic commands ###


def downgrade():
    ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comment')
    op.drop_table('task')
    op.drop_table('user')
    ### end Alembic commands ###